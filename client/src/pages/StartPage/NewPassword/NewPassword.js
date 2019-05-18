import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./NewPassword.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

import { verifyRegistrationForm } from "../../../modules/helpers";
import {
  changePassword,
  setInputData,
  setRedirect,
  setAlert
} from "../../../actions/AppActions";

const helpText = "Create new password.";

class LogIn extends Component {
  onBtnClick = e => {
    var { email, password, confPassword, recoveryKey } = this.props.app;
    const verifyFormStatus = verifyRegistrationForm(
      undefined,
      undefined,
      password,
      confPassword
    );

    if (!verifyFormStatus[0]) {
      var formData = { email, password, confPassword, recoveryKey };
      this.props.changePassword(formData);
    } else {
      this.props.setAlert(verifyFormStatus[1], verifyFormStatus[2]);
    }
  };

  onInputChange = e => {
    const data = e.target.value,
      elem = e.target.id,
      sendData = {};

    sendData[elem] = data;

    this.props.setInputData(sendData);
  };

  render() {
    if (this.props.app.redirect) {
      this.props.setRedirect(false);
      return <Redirect to="/login" />;
    }
    return (
      <BGTemplate>
        <Text className="text-reset_password" text={helpText} />
        <Form className="form_new-password">
          <Input empty />
          <Input empty />
          <Input
            id="password"
            type="password"
            onChange={this.onInputChange}
            placeholder="Password"
          />
          <Input
            id="confPassword"
            type="password"
            onChange={this.onInputChange}
            placeholder="Confirm password"
          />
        </Form>

        <Button onClick={this.onBtnClick} text="Confirm" />
      </BGTemplate>
    );
  }
}

LogIn.propTypes = {
  app: PropTypes.object.isRequired,
  changePassword: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  setInputData: inputData => dispatch(setInputData(inputData)),
  changePassword: formData => dispatch(changePassword(formData)),
  setRedirect: redirect => dispatch(setRedirect(redirect)),
  setAlert: (title, text, button, hidden) =>
    dispatch(setAlert(title, text, button, hidden))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
