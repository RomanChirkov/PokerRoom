import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./RecoveryKey.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../elements/Button/Button";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

import {
  setInputData,
  setAlert,
  setRedirect,
  getRecoveryKey,
  validateRecoveryKey
} from "../../../actions/AppActions";

const helpText = "We send the recovery key to your email.";

class RecoveryKey extends Component {
  onButtonClick = e => {
    var { recoveryKey, email } = this.props.app;
    if (recoveryKey.length !== 6) {
      this.props.setAlert("Incorrect data entered", "Invalid key entered");
      return null;
    }
    this.props.validateRecoveryKey(email, recoveryKey);
  };

  onKeyChange = e => {
    const key = e.target.value,
      elem = e.target.id,
      sendData = {};

    sendData[elem] = key;

    this.props.setInputData(sendData);
  };

  onResendClick = e => {
    this.props.getRecoveryKey(this.props.app.email, false, false);
  };

  render() {
    if (this.props.app.redirect) {
      this.props.setRedirect(false);
      return <Redirect to="/new_password" />;
    }
    return (
      <BGTemplate>
        <Text className="text-recovery_key" text={helpText} />
        <Form className="form_recovery_key">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input
            id="recoveryKey"
            onChange={this.onKeyChange}
            placeholder="Recovery key"
          />
        </Form>
        <LinkText
          onClick={this.onResendClick}
          className="flex-right form-link_text"
          // to="/recovery_key"
          text="Resend key"
        />

        <Button
          onClick={this.onButtonClick}
          className="button-fixed"
          text="Confirm"
        />
        <LinkText
          className="flex-left"
          to="/reset_password"
          text="< change email"
        />
      </BGTemplate>
    );
  }
}

RecoveryKey.propTypes = {
  app: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  getRecoveryKey: PropTypes.func.isRequired,
  validateRecoveryKey: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  setAlert: (title, text, button, hidden) =>
    dispatch(setAlert(title, text, button, hidden)),
  setInputData: inputData => dispatch(setInputData(inputData)),
  setRedirect: redirect => dispatch(setRedirect(redirect)),
  getRecoveryKey: (email, alertHidden, redirect) =>
    dispatch(getRecoveryKey(email, alertHidden, redirect)),
  validateRecoveryKey: (email, key) => dispatch(validateRecoveryKey(email, key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryKey);
