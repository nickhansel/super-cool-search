import { Link } from "react-router-dom";

import "./SideBarSection.css";
import Bubble from "./Bubble";

function SideBarItem({
  id,
  url,
  route,
  title,
  image,
  hue,
  symbol,
  handleFilterBySubreddit,
  selectedSubreddit,
}) {
  return (
    <div
      style={{
        backgroundColor:
          selectedSubreddit === title ? "var(--floofe-color-6)" : null,
      }}
      className="SideBarItem"
    >
      {url ? (
        <a
          href={"#"}
          onClick={() => handleFilterBySubreddit(title)}
          className="SideBarItemLeft"
        >
          <Bubble
            image={image}
            hue={hue}
            seed={id}
            symbol={symbol ? symbol : ""}
          />
          <div className="SideBarItemTitle">{title}</div>
        </a>
      ) : (
        <Link to={`/${route}/${id}`} className="SideBarItemLeft">
          <Bubble
            image={image}
            hue={hue}
            seed={id}
            symbol={symbol ? symbol : ""}
          />
          <div className="SideBarItemTitle">{title}</div>
        </Link>
      )}
    </div>
  );
}

function SideBarSection({
  title,
  route,
  items,
  buttons,
  handleFilterBySubreddit,
  selectedSubreddit,
}) {
  const removeSubredditParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("subreddit");
    window.history.replaceState({}, "", url);
  };

  return (
    <div className="SideBarSection">
      <div className="SideBarHeading">
        <div className="SideBarHeading-title">{title}</div>
        <div className="SideBarHeadingButtons">
          {buttons.map(({ text, to }) => (
            <Link to={to}>
              <div className="SideBarHeadingButton">{text}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="SideBarItems">
        {items?.map((item) => (
          <SideBarItem
            selectedSubreddit={selectedSubreddit}
            handleFilterBySubreddit={handleFilterBySubreddit}
            key={item.id}
            id={item.id}
            url={item.url}
            route={route}
            title={item.title}
            image={item.bubbleImage}
            hue={item.hue}
            symbol={item.emoji}
          />
        ))}
      </div>
      <div className="SideBarFooter">
        <div
          onClick={() => {
            removeSubredditParam();
            handleFilterBySubreddit(null);
          }}
          className="SideBarSeeAll"
        >
          See all
        </div>
      </div>
    </div>
  );
}

export default SideBarSection;
