import "./App.css";

import react from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";

import SearchResults from "./pages/SearchResults";

class App extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "1",
      subredditFilter: null,
    };

    this.handleFilterBySubreddit = this.handleFilterBySubreddit.bind(this);
  }

  handleFilterBySubreddit(subreddit) {
    const { subredditFilter } = this.state;
    if (subredditFilter === subreddit) {
      this.setState({ subredditFilter: null });
      return;
    }
    this.setState({ subredditFilter: subreddit });
  }

  render() {
    const { subredditFilter } = this.state;

    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                selectedSubreddit={subredditFilter}
                handleFilterBySubreddit={this.handleFilterBySubreddit}
              />
            }
          >
            <Route path="search">
              <Route
                path=":query"
                element={<SearchResults subreddit={subredditFilter} />}
              />
            </Route>
            <Route
              index
              element={<SearchResults subreddit={subredditFilter} />}
            />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
