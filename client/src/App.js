import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignUp from "./pages/StartPage/SignUp/SignUp";
import LogIn from "./pages/StartPage/LogIn/LogIn";
import ResetPassword from "./pages/StartPage/ResetPassword/ResetPassword";
import NewPassword from "./pages/StartPage/NewPassword/NewPassword";
import RecoveryKey from "./pages/StartPage/RecoveryKey/RecoveryKey";

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={null} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/recovery_key" component={RecoveryKey} />
        <Route path="/new_password" component={NewPassword} />
      </Router>
    );
  }
}

export default App;
