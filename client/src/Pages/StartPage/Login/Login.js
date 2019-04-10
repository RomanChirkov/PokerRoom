import React, { Component } from "react";
import "./LogIn.css";

import Button from "../../../Elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../Elements/Input/Input";
import LinkText from "../../../Elements/LinkText/LinkText";
import Form from "../../../Elements/Form/Form";

class LogIn extends Component {
  render() {
    return (
      <BGTemplate>
        <Form styles="form_login">
          <Input empty />
          <Input empty />
          <Input placeholder="Nickname or email" />
          <Input placeholder="Password" />
        </Form>
        <LinkText
          styles="flex-right form-link_text"
          to="/reset-password"
          text="Forgot your password?"
        />

        <Button text="Log In" />
        <LinkText styles="flex-left" to="/" text="Don`t have an account?" />
      </BGTemplate>
    );
  }
}

export default LogIn;
