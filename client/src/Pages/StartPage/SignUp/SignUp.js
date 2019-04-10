import React, { Component } from "react";
import "./SignUp.css";

import Button from "../../../Elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../Elements/Input/Input";
import LinkText from "../../../Elements/LinkText/LinkText";
import Form from "../../../Elements/Form/Form";

class SignUp extends Component {
  render() {
    return (
      <BGTemplate>
        <Form styles="form_signup">
          <Input placeholder="Nickname" />
          <Input placeholder="Email address" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm password" />
        </Form>

        <Button styles="button-fixed" text="Sign Up" />
        <LinkText styles="flex-left" to="/LogIn" text="Click here to LogIn" />
      </BGTemplate>
    );
  }
}

export default SignUp;
