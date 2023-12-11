import "./SearchBar.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchBar({ setSearchBoxActive, style, handleNewExploreItems }) {
  let { query: navQ } = useParams();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    //convert input text to lower case
    var q = e.target.value.toLowerCase();
    setQuery(q);
  };

  const submitHandler = async (e) => {
    if (e.key === "Enter") {
      if (query) {
        navigate(`/search/${query}`);
      } else {
        navigate(`/`);
      }
    }
  };

  useEffect(() => {
    setQuery(navQ);
  }, [navQ]);

  return (
    <div className="SearchBox" style={style || {}}>
      <div className="SearchBar">
        <input
          type="text"
          placeholder="search"
          value={query}
          onChange={inputHandler}
          onKeyDown={submitHandler}
          onFocus={() => setSearchBoxActive(true)}
          onBlur={() => setSearchBoxActive(false)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
