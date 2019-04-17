import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Alert.css";

import Button from "../Button/Button";

import { setAlertHidden } from "../../actions/AppActions";

class Alert extends Component {
  onClick = e => {
    this.props.onClick && this.props.onClick(e);
    setTimeout(this.props.setAlertHidden, 200, true);
  };

  render() {
    let { title, text, button, hidden } = this.props.app.alert;
    let className = "alert-default " + (this.props.className || "");
    title = title.toUpperCase();
    text = text.split("\n").map((el, i) => <p key={i}>{el}</p>);
    return (
      <div className={"alert-box " + (hidden && "hidden")}>
        <div className={className}>
          <h3>{title}</h3>
          <div>{text}</div>
          <Button onClick={this.onClick} text={button} />
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  onClick: PropTypes.func,
  setAlertHidden: PropTypes.func.isRequired,
  app: PropTypes.object,
  className: PropTypes.string
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  setAlertHidden: hidden => dispatch(setAlertHidden(hidden))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert);
