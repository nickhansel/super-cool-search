import { useState, useEffect } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";

import "./SearchResults.css";

import SearchResult from "../components/SearchResult";
import Spinner from "../components/ui/Spinner";

import search from "../operations/search";

function SearchResults({ subreddit }) {
  let { query } = useParams();
  const [sideBarSections, setSideBarSections] = useOutletContext();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultQuery = "7 day Korea itinerary";

  const navigate = useNavigate();

  const filterSubreddit = (subreddit) => {
    if (!subreddit) return;
    const params = new URLSearchParams(window.location.search);
    params.set("subreddit", subreddit);
    navigate({ search: params.toString() });
  };

  function generateId(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleSideBar = (data) => {
    const subreddits = data?.subreddits?.map((title) => ({
      id: generateId(0, 999999),
      title: title,
      url: `https://www.reddit.com/r/${title}`,
      bubbleImage: "",
      hue: "",
      emoji: "",
    }));

    setSideBarSections([
      {
        id: "explore-more",
        title: "Filter by subreddit",
        buttons: [],
        items: subreddits,
      },
    ]);
  };

  useEffect(() => {
    if (subreddit) {
      filterSubreddit(subreddit);
    }
    setLoading(true);
    search(query ? query : defaultQuery, subreddit).then((data) => {
      setResults(data?.results || []);

      handleSideBar(data);
      setLoading(false);
    });
  }, [query, subreddit]);

  return (
    <div className="SearchResults ContentArea">
      <h2>"{query ? query : defaultQuery}"</h2>
      {loading ? (
        <div className="SpinnerBox">
          <Spinner />
        </div>
      ) : (
        results?.map((result) => (
          <SearchResult key={result?.id} post={result?.data} />
        ))
      )}
    </div>
  );
}

export default SearchResults;
