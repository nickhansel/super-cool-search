from flask import Flask, request, jsonify
from search import Search
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

api_key = os.environ.get('PINECONE_API_KEY')

searcher = Search(
    pinecone_api_key=api_key,
    index_name='cool-search',
    model_name="all-MiniLM-L6-v2",
)

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '')
    subreddit = request.args.get('subreddit', '')
    if not query:
        return jsonify({"error": "Query parameter is required."}), 400

    try:
        results = searcher.search(query, subreddit)
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
