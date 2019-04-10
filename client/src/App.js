import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./Pages/StartPage/SignUp/SignUp";
import BGtempate from "./Pages/StartPage/BGTemplate";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={SignUp} />
      </Router>
    );
  }
}

export default App;
