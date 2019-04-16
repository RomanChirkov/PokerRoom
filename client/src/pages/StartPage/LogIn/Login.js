import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import "./LogIn.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";

import {
  logInSubmit,
  setInputData,
  setRedirect
} from "../../../actions/StartPageActions";

class LogIn extends Component {
  onBtnClick = e => {
    var { login, password } = this.props.startPage;

    if (login.length > 0 && password.length > 0) {
      var formData = { login, password };
      this.props.logInSubmit(formData);
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
    if (this.props.startPage.redirect) {
      this.props.setRedirect(false);
      return <Redirect to="/" />;
    }
    return (
      <BGTemplate>
        <Form styles="form_login">
          <Input empty />
          <Input empty />
          <Input
            id="login"
            type="email"
            onChange={this.onInputChange}
            placeholder="Nickname or mail"
          />
          <Input
            id="password"
            type="password"
            onChange={this.onInputChange}
            placeholder="Password"
          />
        </Form>
        <LinkText
          styles="flex-right form-link_text"
          to="/reset-password"
          text="Forgot your password?"
        />

        <Button onClick={this.onBtnClick} text="Log In" />
        <LinkText styles="flex-left" to="/" text="Don`t have an account?" />
      </BGTemplate>
    );
  }
}

LogIn.propTypes = {
  startPage: PropTypes.object.isRequired,
  logInSubmit: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  startPage: state.startPage
});

const mapDispatchToProps = dispatch => ({
  logInSubmit: formData => dispatch(logInSubmit(formData)),
  setInputData: inputData => dispatch(setInputData(inputData)),
  setRedirect: redirect => dispatch(setRedirect(redirect))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
