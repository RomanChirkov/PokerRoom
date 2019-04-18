import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import "./SignUp.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";

import { verifyRegistrationForm } from "../../../modules/helpers";
import {
  signUpSubmit,
  setInputData,
  setRedirect,
  setAlert
} from "../../../actions/AppActions";

class SignUp extends Component {
  onBtnClick = e => {
    var { login, email, password, confPassword } = this.props.app;
    const verifyFormStatus = verifyRegistrationForm(
      login,
      email,
      password,
      confPassword
    );

    if (!verifyFormStatus[0]) {
      var formData = { login, email, password, confPassword };
      this.props.signUpSubmit(formData);
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
        <Form className="form_signup">
          <Input
            id="login"
            onChange={this.onInputChange}
            placeholder="Nickname"
          />
          <Input
            id="email"
            type="email"
            onChange={this.onInputChange}
            placeholder="Email address"
          />
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

        <Button
          onClick={this.onBtnClick}
          className="button-fixed"
          text="Sign Up"
        />
        <LinkText
          className="flex-left"
          to="/login"
          text="Click here to LogIn"
        />
      </BGTemplate>
    );
  }
}

SignUp.propTypes = {
  app: PropTypes.object.isRequired,
  signUpSubmit: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  signUpSubmit: formData => dispatch(signUpSubmit(formData)),
  setInputData: inputData => dispatch(setInputData(inputData)),
  setRedirect: redirect => dispatch(setRedirect(redirect)),
  setAlert: (title, text, button, hidden) =>
    dispatch(setAlert(title, text, button, hidden))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
