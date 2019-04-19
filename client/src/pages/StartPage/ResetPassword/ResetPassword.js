import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./ResetPassword.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../elements/Button/Button";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

import { validateEmail } from "../../../modules/helpers";
import { setInputData, setAlert } from "../../../actions/AppActions";

const helpText =
  "We can help you to reset your password using your email address linked to your account.";

class ResetPassword extends Component {
  onButtonClick = e => {
    if (!validateEmail(this.props.app.email)) {
      this.props.setAlert("Incorrect data entered", "Invalid email entered");
      return null;
    }
    this.props.setAlert("Успех", "Письмо отправлено на почту");
    //отправить письмо на почту
  };

  onEmailChange = e => {
    const email = e.target.value,
      elem = e.target.id,
      sendData = {};

    sendData[elem] = email;

    this.props.setInputData(sendData);
  };

  render() {
    return (
      <BGTemplate>
        <Text className="text-reset_password" text={helpText} />
        <Form className="form_reset_password">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input
            id="email"
            type="email"
            onChange={this.onEmailChange}
            placeholder="Email address"
          />
        </Form>

        <Button
          onClick={this.onButtonClick}
          className="button-fixed"
          text="Send recovery key"
        />
        <LinkText className="flex-left" to="/login" text="< go back" />
      </BGTemplate>
    );
  }
}

ResetPassword.propTypes = {
  app: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  setAlert: (title, text, button, hidden) =>
    dispatch(setAlert(title, text, button, hidden)),
  setInputData: inputData => dispatch(setInputData(inputData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
