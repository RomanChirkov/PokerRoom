import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import "./BGTemplate.css";

class BGTemplate extends Component {
  render() {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />;
    }
    return <div className="backround_wrapper-lobby">{this.props.children}</div>;
  }
}

BGTemplate.propTypes = {
  children: PropTypes.node,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.app.isAuth
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BGTemplate);
