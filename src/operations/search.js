import { API_URL } from "./api";

async function search(query, subreddit) {
  return fetch(
    `${API_URL}/search?query=${query}` +
      (subreddit ? `&subreddit=${subreddit}` : ""),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then(
      (data) => {
        console.log(data);
        return data || {};
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
        return {};
      }
    );
}

export default search;
