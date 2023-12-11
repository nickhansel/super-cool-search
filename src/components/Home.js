import "./Home.css";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import SearchPage from "./SearchPage";

function Home({ handleFilterBySubreddit, selectedSubreddit }) {
  const [sideBarSections, setSideBarSections] = useState([
    {
      id: "explore-more",
      title: "Filter by subreddit",
      buttons: [],
      items: [],
    },
    {
      id: "dig-deeper",
      title: "Dig Deeper",
      buttons: [],
      items: [],
    },
  ]);

  const handleNewExploreItems = (items) => {
    // add the items to the items array in the explore-more section
    setSideBarSections((prev) => {
      const newSections = [...prev];
      newSections[0].items = items;
      return newSections;
    });
  };

  return (
    <div className="Home">
      <SearchPage
        selectedSubreddit={selectedSubreddit}
        handleFilterBySubreddit={handleFilterBySubreddit}
        handleNewExploreItems={handleNewExploreItems}
        sections={sideBarSections}
      />
      <Outlet context={[sideBarSections, setSideBarSections]} />
    </div>
  );
}

export default Home;
