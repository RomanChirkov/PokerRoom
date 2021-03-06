import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import SignUp from "./pages/StartPage/SignUp/SignUp";
import LogIn from "./pages/StartPage/LogIn/LogIn";
import ResetPassword from "./pages/StartPage/ResetPassword/ResetPassword";
import NewPassword from "./pages/StartPage/NewPassword/NewPassword";
import RecoveryKey from "./pages/StartPage/RecoveryKey/RecoveryKey";
import Lobby from "./pages/MainPage/Lobby/Lobby";
import PageNotFound from "./pages/PageNotFound";

import Alert from "./elements/Alert/Alert";

import { setAuth, validateCookie } from "./actions/AppActions";

class App extends Component {
  componentWillMount() {
    // let cookie = getUserCookie();
    // if (!Object.keys(cookie).length) return null;
    // this.props.setAuth(true, cookie);
    this.props.validateCookie();
  }

  render() {
    return (
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Lobby} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Route path="/reset_password" component={ResetPassword} />
          <Route path="/recovery_key" component={RecoveryKey} />
          <Route path="/new_password" component={NewPassword} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  app: PropTypes.object.isRequired,
  // logOutUser: PropTypes.func.isRequired,
  validateCookie: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  // setRedirect: redirect => dispatch(setRedirect(redirect)),
  validateCookie: () => dispatch(validateCookie()),
  setAuth: (auth, userData) => dispatch(setAuth(auth, userData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
