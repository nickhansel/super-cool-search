import Header from "./Header";
import SideBar from "./SideBar";

function SearchPage({
  handleNewExploreItems,
  sections,
  handleFilterBySubreddit,
  selectedSubreddit,
}) {
  return (
    <div className="Home">
      <Header handleNewExploreItems={handleNewExploreItems} />
      <SideBar
        selectedSubreddit={selectedSubreddit}
        sections={sections}
        handleFilterBySubreddit={handleFilterBySubreddit}
      />
    </div>
  );
}

export default SearchPage;
