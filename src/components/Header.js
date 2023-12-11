import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";
import SearchBar from "./SearchBar";

function Header({ handleNewExploreItems }) {
  const [searchBoxActive, setSearchBoxActive] = useState(false);

  const hideWhenSearchActive = searchBoxActive ? { display: "none" } : {};
  const boxStyle = searchBoxActive ? { maxWidth: "70%" } : {};

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (!theme) {
      setTheme(localStorage.getItem("theme") || "dark");
    } else {
      document
        .getElementsByTagName("html")[0]
        .setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="Header">
      <div className="HeaderContent">
        <Link to="/">
          <div className="HeaderLogo">
            <span className="HeaderLogoText">giga</span>
            <img className="HeaderLogoImage" src="/galaxy-brain.png" />
          </div>
        </Link>
        <SearchBar
          handleNewExploreItems={handleNewExploreItems}
          setSearchBoxActive={setSearchBoxActive}
          style={boxStyle}
        />
        <div
          className="HeaderThemeSetter"
          style={hideWhenSearchActive}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <div className={theme === "dark" ? "InactiveTheme" : "ActiveTheme"}>
            ☀️
          </div>
          <div className={theme === "dark" ? "ActiveTheme" : "InactiveTheme"}>
            🌙
          </div>
        </div>
        <div className="HeaderButtons" style={hideWhenSearchActive}>
          <div className="HeaderButton HeaderJoin">Join</div>
          <div className="HeaderButton HeaderLogin">Login</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
