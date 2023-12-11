import pinecone
from sentence_transformers import SentenceTransformer
import json
from datetime import datetime, timezone
from collections import defaultdict

class Search:
    def __init__(self, pinecone_api_key, index_name, model_name):
        self.index_name = index_name
        self.model = SentenceTransformer(model_name, device="cpu")

        pinecone.init(api_key=pinecone_api_key, environment='us-west1-gcp')
        self.index = pinecone.Index(index_name)

    def perform_search(self, query_text, top_k=100):
        query_vector = self.model.encode(query_text).tolist() # convert to list from np array
        return self.index.query(vector=[query_vector], top_k=top_k, include_metadata=True)

    # crude ranking algo
    def rank_results(self, results):
        WEIGHT_RELEVANCE = 0.5
        WEIGHT_SCORE = 0.3
        WEIGHT_RECENCY = 0.2
        WEIGHT_IS_COMMENT = -0.1
        WEIGHT_TEXT_LENGTH = 0.05

        ranked_results = []
        for result in results:
            total_score = (
                WEIGHT_RELEVANCE * self.calculate_relevance_score(result['distance']) +
                WEIGHT_SCORE * self.calculate_engagement_score(result['data']) +
                WEIGHT_RECENCY * self.calculate_recency_score(result['data']) +
                WEIGHT_TEXT_LENGTH * self.calculate_text_length_score(result['data']) +
                (WEIGHT_IS_COMMENT if self.is_comment(result['data']) else 0)
            )
            ranked_results.append((result, total_score))

        ranked_results.sort(key=lambda x: x[1], reverse=True)
        return [res[0] for res in ranked_results[:25]]

    def calculate_relevance_score(self, distance):
        return 1 / (1 + distance)

    def calculate_engagement_score(self, metadata):
        return int(metadata.get('score', 0))

    def calculate_recency_score(self, metadata):
        created_utc = metadata.get('created_utc', '')
        post_date = self.parse_date(created_utc)
        days_since_post = (datetime.now(timezone.utc) - post_date).days
        return 1 / (1 + days_since_post)

    def parse_date(self, date_str):
        if isinstance(date_str, str):
            return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S UTC").replace(tzinfo=timezone.utc)
        elif isinstance(date_str, datetime):
            return date_str
        raise ValueError(f"Unexpected data type for 'created_utc': {type(date_str)}")

    def calculate_text_length_score(self, metadata):
        selftext = metadata.get('selftext', '')
        return len(selftext.split()) / 100

    def is_comment(self, metadata):
        return "parent_id" in metadata

    def query_by_subreddit(self, query_text, subreddit, top_k):
        query_vector = self.model.encode(query_text).tolist()
        result = self.index.query(
            vector=[query_vector],
            filter={"subreddit": {"$eq": subreddit}},
            top_k=top_k,
            include_metadata=True
        )
        return result

    def build_url(self, permalink):
        return f"https://www.reddit.com{permalink}"

    def search(self, query, subreddit=None):
        top_k = 100
        results = self.query_by_subreddit(query, subreddit, top_k) if subreddit else self.perform_search(query, top_k)

        search_results = self.process_results(results)
        ranked_results = self.rank_results(search_results)

        unique_subreddits = defaultdict(int)
        for result in ranked_results:
            unique_subreddits[result["data"]["subreddit"]] += 1

        unique_subreddits = sorted(unique_subreddits.items(), key=lambda x: x[1], reverse=True)[:5] # get top 5

        # modify results to include url (ugly, i know)
        ranked_results = [{**result, "data": {**result["data"], "url": self.build_url(result["data"]["permalink"])}} for result in ranked_results]

        data = {
            "results": ranked_results,
            "subreddits": [name for name, _ in unique_subreddits],
        }

        return data

    def process_results(self, results):
        search_results = []

        for match in results["matches"]:
            metadata = match.get("metadata", {})
            cur_result = {
                "id": match["id"],
                "distance": match["score"],
                "data": metadata,
            }
            search_results.append(cur_result)

        return search_results

