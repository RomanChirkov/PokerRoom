import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignUp from "./Pages/StartPage/SignUp/SignUp";
import LogIn from "./Pages/StartPage/LogIn/LogIn";
import ResetPassword from "./Pages/StartPage/ResetPassword/ResetPassword";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/reset-password" component={ResetPassword} />
      </Router>
    );
  }
}

export default App;
