import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./Lobby.css";

import Button from "../../../elements/Button/Button";

import { setRedirect, setAuth, logOutUser } from "../../../actions/AppActions";

class Lobby extends Component {
  onLogOut = e => {
    this.props.logOutUser();
    this.props.setAuth(false, { login: "", email: "", token: "" });
  };
  render() {
    if (!this.props.app.isAuth) {
      this.props.setRedirect(false);
      return <Redirect to="/login" />;
    }
    return <Button onClick={this.onLogOut} text="Logout" />;
  }
}

Lobby.propTypes = {
  app: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  setAuth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  setRedirect: redirect => dispatch(setRedirect(redirect)),
  logOutUser: () => dispatch(logOutUser()),
  setAuth: auth => dispatch(setAuth(auth))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
