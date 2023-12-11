import "./SideBar.css";
import SideBarSection from "./SideBarSection";

function SideBar({ sections, handleFilterBySubreddit, selectedSubreddit }) {
  return (
    <div className="SideBar">
      {(sections || []).map((section) => (
        <SideBarSection
          selectedSubreddit={selectedSubreddit}
          handleFilterBySubreddit={handleFilterBySubreddit}
          key={section.id}
          route={section.id}
          title={section.title}
          items={section.items}
          buttons={section.buttons}
        />
      ))}
    </div>
  );
}

export default SideBar;
