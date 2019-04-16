import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./SignUp.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";

import { validateEmail } from "../../../modules/helpers";
import { signUpSubmit, setInputData } from "../../../actions/StartPageActions";

class SignUp extends Component {
  onBtnClick = e => {
    var { login, email, password, confPassword } = this.props.startPage;

    if (
      login.length >= 4 &&
      validateEmail(email) &&
      password.length >= 4 &&
      password === confPassword
    ) {
      var formData = { login, email, password, confPassword };
      this.props.signUpSubmit(formData);
    } else {
      alert("неправильно введены данные");
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
    return (
      <BGTemplate>
        <Form styles="form_signup">
          <Input
            id="login"
            onChange={this.onInputChange}
            placeholder="Nickname"
          />
          <Input
            id="email"
            onChange={this.onInputChange}
            placeholder="Email address"
          />
          <Input
            id="password"
            onChange={this.onInputChange}
            placeholder="Password"
          />
          <Input
            id="confPassword"
            onChange={this.onInputChange}
            placeholder="Confirm password"
          />
        </Form>

        <Button
          onClick={this.onBtnClick}
          styles="button-fixed"
          text="Sign Up"
        />
        <LinkText styles="flex-left" to="/login" text="Click here to LogIn" />
      </BGTemplate>
    );
  }
}

SignUp.propTypes = {
  startPage: PropTypes.object.isRequired,
  signUpSubmit: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  startPage: state.startPage
});

const mapDispatchToProps = dispatch => ({
  signUpSubmit: formData => dispatch(signUpSubmit(formData)),
  setInputData: inputData => dispatch(setInputData(inputData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
