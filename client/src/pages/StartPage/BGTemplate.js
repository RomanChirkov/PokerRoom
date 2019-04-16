import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./BGTemplate.css";
import HeaderTitle from "../../elements/HeaderTitle/HeaderTitle";

import { clearFormData } from "../../actions/AppActions";

class BGTemplate extends Component {
  componentDidMount() {
    this.props.clearFormData();
  }

  render() {
    return (
      <div className="backround_wrapper">
        <HeaderTitle />
        {this.props.children}
      </div>
    );
  }
}

BGTemplate.propTypes = {
  children: PropTypes.node
};

const mapDispatchToProps = dispatch => ({
  clearFormData: () => dispatch(clearFormData())
});

export default connect(
  null,
  mapDispatchToProps
)(BGTemplate);
