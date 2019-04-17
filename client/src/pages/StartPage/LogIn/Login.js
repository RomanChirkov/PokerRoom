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

import { verifyRegistrationForm } from "../../../modules/helpers";
import {
  logInSubmit,
  setInputData,
  setRedirect,
  setAlert
} from "../../../actions/AppActions";

class LogIn extends Component {
  onBtnClick = e => {
    var { login, password } = this.props.app;
    const verifyFormStatus = verifyRegistrationForm(login, undefined, password);
    if (!verifyFormStatus[0]) {
      var formData = { login, password };
      this.props.logInSubmit(formData);
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
      return <Redirect to="/" />;
    }
    return (
      <BGTemplate>
        <Form className="form_login">
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
          className="flex-right form-link_text"
          to="/reset-password"
          text="Forgot your password?"
        />

        <Button onClick={this.onBtnClick} text="Log In" />
        <LinkText
          className="flex-left"
          to="/signup"
          text="Don`t have an account?"
        />
      </BGTemplate>
    );
  }
}

LogIn.propTypes = {
  app: PropTypes.object.isRequired,
  logInSubmit: PropTypes.func.isRequired,
  setInputData: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

const mapDispatchToProps = dispatch => ({
  logInSubmit: formData => dispatch(logInSubmit(formData)),
  setInputData: inputData => dispatch(setInputData(inputData)),
  setRedirect: redirect => dispatch(setRedirect(redirect)),
  setAlert: (title, text, button, hidden) =>
    dispatch(setAlert(title, text, button, hidden))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
