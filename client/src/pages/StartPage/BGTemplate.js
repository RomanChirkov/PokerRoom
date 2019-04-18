import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import HeaderTitle from "../../elements/HeaderTitle/HeaderTitle";
import "./BGTemplate.css";

import { clearFormData } from "../../actions/AppActions";

class BGTemplate extends Component {
  componentWillUnmount() {
    this.props.clearFormData();
  }

  render() {
    if (this.props.isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <div className="backround_wrapper">
        <HeaderTitle />
        {this.props.children}
      </div>
    );
  }
}

BGTemplate.propTypes = {
  children: PropTypes.node,
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.app.isAuth
});

const mapDispatchToProps = dispatch => ({
  clearFormData: () => dispatch(clearFormData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BGTemplate);
