import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import SignUp from "./pages/StartPage/SignUp/SignUp";
import LogIn from "./pages/StartPage/LogIn/LogIn";
import ResetPassword from "./pages/StartPage/ResetPassword/ResetPassword";

import { testAction, test1Action } from "./actions/testAction";

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  testAction: () => dispatch(testAction()),
  test1Action: () => dispatch(test1Action())
});

class App extends Component {
  testAction = event => {
    this.props.testAction();
  };

  test1Action = event => {
    this.props.test1Action();
  };

  render() {
    return (
      <Router>
        <button onClick={this.testAction}>Test</button>
        <button onClick={this.test1Action}>Test1</button>
        <pre>{JSON.stringify(this.props)}</pre>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/reset-password" component={ResetPassword} />
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
