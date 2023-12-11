import "./SearchResult.css";

import { useState } from "react";

import Bubble from "./Bubble";

function Post({ post, children }) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 140;
  const condensedText =
    post?.selftext?.length <= previewLength
      ? post?.selftext
      : `${(post.selftext || "").substring(0, previewLength)}... `;

  return (
    <a className="Post" href={post?.url} target="_blank" rel="noreferrer">
      <Bubble
        className="PostAuthorBubble"
        small
        seed={post?.author}
        symbol={"❔"}
      />
      <p>{post?.over_18 ? "🔞" : null}</p>
      <div className="PostContent">
        <div className="PostTitle">{post?.title}</div>
        <br />
        {post?.selftext ? (
          <div className={"PostText"}>
            {expanded ? post?.selftext : condensedText}
            {!expanded && post?.selftext?.length > previewLength ? (
              <span
                className="PostExpandButton"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setExpanded(true);
                }}
              >
                expand
              </span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="PostInfo">
          {post?.subreddit ? (
            <div className="PostSubreddit">{"r/" + post?.subreddit}</div>
          ) : (
            ""
          )}
          {post?.score ? (
            <div className="PostUpvotes">
              <span className="EmojiIcon">⬆️ </span>
              {post?.score}
            </div>
          ) : (
            ""
          )}
          {post?.created_utc ? (
            <div className="PostDate">
              <span className="EmojiIcon">🕓 </span>
              {post?.created_utc}
            </div>
          ) : (
            ""
          )}
          {post?.author ? (
            <div className="PostAuthor">
              <span className="EmojiIcon">🙇 </span>
              {post?.author}
            </div>
          ) : (
            ""
          )}
        </div>
        {children}
      </div>
    </a>
  );
}

function SearchResult({ post }) {
  return (
    <div className="SearchResult">
      <Post post={post} />
    </div>
  );
}

export default SearchResult;
