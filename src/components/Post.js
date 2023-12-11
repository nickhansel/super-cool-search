import "./Post.css";

import Bubble from "./Bubble";

function Post({ title, author, threads }) {
  return (
    <div className="Post">
      <div className="PostOP Blurb">
        <Bubble seed={author} symbol={"❔"} />
        <div className="PostTitle">{title}</div>
      </div>
      {threads.map((thread) => (
        <div className="PostThreads">
          <div className="PostComment Blurb">
            <Bubble seed={thread.author} symbol={"🙋"} />
            <div>{thread.body}</div>
          </div>
          {thread.op_res ? (
            <div className="PostOPRes Blurb">
              <Bubble seed={author} symbol={"🙏"} />
              <div>{thread.op_res}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
