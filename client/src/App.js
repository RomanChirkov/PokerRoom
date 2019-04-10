import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./Pages/StartPage/SignUp/SignUp";
import BGtempate from "./Pages/StartPage/BGTemplate";

import Login from "./Pages/StartPage/Login/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
