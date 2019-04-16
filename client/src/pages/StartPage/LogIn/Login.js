import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./LogIn.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";

class LogIn extends Component {
  render() {
    return (
      <BGTemplate>
        <Form styles="form_login">
          <Input empty />
          <Input empty />
          <Input placeholder="Nickname or mail" />
          <Input placeholder="Password" />
        </Form>
        <LinkText
          styles="flex-right form-link_text"
          to="/reset-password"
          text="Forgot your password?"
        />

        <Button text="Log In" />
        {/*собрать данные со всех полей и отправить на сервер*/}
        <LinkText styles="flex-left" to="/" text="Don`t have an account?" />
      </BGTemplate>
    );
  }
}

LogIn.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
