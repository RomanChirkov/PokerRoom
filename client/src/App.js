import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import SignUp from "./pages/StartPage/SignUp/SignUp";
import LogIn from "./pages/StartPage/LogIn/LogIn";
import ResetPassword from "./pages/StartPage/ResetPassword/ResetPassword";
import NewPassword from "./pages/StartPage/NewPassword/NewPassword";
import RecoveryKey from "./pages/StartPage/RecoveryKey/RecoveryKey";

import Alert from "./elements/Alert/Alert";
import Lobby from "./pages/MainPage/Lobby/Lobby";

import { getUserCookie } from "./modules/helpers";
import { setAuth } from "./actions/AppActions";

class App extends Component {
  componentWillMount() {
    let cookie = getUserCookie();
    if (!Object.keys(cookie).length) return null;
    this.props.setAuth(true, cookie);
  }

  render() {
    return (
      <Router>
        <Alert />
        <Route exact path="/" component={Lobby} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/reset_password" component={ResetPassword} />
        <Route path="/recovery_key" component={RecoveryKey} />
        <Route path="/new_password" component={NewPassword} />
      </Router>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  // logOutUser: PropTypes.func.isRequired,
  // setRedirect: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  // setRedirect: redirect => dispatch(setRedirect(redirect)),
  // logOutUser: () => dispatch(logOutUser()),
  setAuth: (auth, userData) => dispatch(setAuth(auth, userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
