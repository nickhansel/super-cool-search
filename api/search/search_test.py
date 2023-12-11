import unittest
from unittest.mock import MagicMock, patch
from search import Search
from datetime import datetime, timezone
import numpy as np

class TestSearch(unittest.TestCase):
    def setUp(self):
        self.mock_model = MagicMock()
        self.mock_model.encode.return_value = np.array([0.1, 0.2, 0.3])

        self.mock_index = MagicMock()

        with patch('search.SentenceTransformer', return_value=self.mock_model):
            with patch('search.pinecone.Index', return_value=self.mock_index):
                self.search = Search("api_key", "index_name", "model_name")

    def test_perform_search(self):
        query_text = "test query"
        top_k = 10

        result = self.search.perform_search(query_text, top_k)

        self.mock_model.encode.assert_called_once_with(query_text)
        self.mock_index.query.assert_called_once_with(vector=[[0.1, 0.2, 0.3]], top_k=top_k, include_metadata=True)
        self.assertEqual(result, self.mock_index.query.return_value)

    def test_rank_results(self):
        mock_results = [
            {'distance': 0.2, 'data': {'score': 10, 'created_utc': '2023-01-01 00:00:00 UTC', 'selftext': 'some text', 'permalink': '/r/test'}},
            {'distance': 0.3, 'data': {'score': 20, 'created_utc': '2023-01-02 00:00:00 UTC', 'selftext': 'some text', 'permalink': '/r/test'}},
        ]

        ranked_results = self.search.rank_results(mock_results)
        self.assertEqual(len(ranked_results), len(mock_results))
        self.assertEqual(ranked_results[0]['distance'], 0.3)
        self.assertGreater(ranked_results[0]['data']['score'], ranked_results[1]['data']['score'])

    def test_calculate_relevance_score(self):
        self.assertAlmostEqual(self.search.calculate_relevance_score(0.1), 1 / (1 + 0.1))
        self.assertAlmostEqual(self.search.calculate_relevance_score(0.5), 1 / (1 + 0.5))

    @patch('search.datetime')
    def test_calculate_recency_score(self, mock_datetime):
        mock_now = datetime(2023, 1, 10, tzinfo=timezone.utc)
        mock_datetime.now.return_value = mock_now

        mock_strptime = MagicMock()
        mock_datetime.strptime.return_value = mock_strptime
        mock_strptime.replace.return_value = datetime(2023, 1, 1, tzinfo=timezone.utc)

        metadata = {'created_utc': '2023-01-01 00:00:00 UTC'}
        expected_score = 1 / (1 + 9)
        self.assertAlmostEqual(self.search.calculate_recency_score(metadata), expected_score)

    def test_query_by_subreddit(self):
        query_text = "test query"
        subreddit = "test_subreddit"
        top_k = 10

        result = self.search.query_by_subreddit(query_text, subreddit, top_k)

        self.mock_model.encode.assert_called_once_with(query_text)
        self.mock_index.query.assert_called_once_with(
            vector=[[0.1, 0.2, 0.3]],
            filter={"subreddit": {"$eq": subreddit}},
            top_k=top_k,
            include_metadata=True
        )

        self.assertEqual(result, self.mock_index.query.return_value)


if __name__ == '__main__':
    unittest.main()
