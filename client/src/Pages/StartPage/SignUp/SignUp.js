import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

          <Form className="container-1">
            <Input />
            <Input />
            <Input />
            <Input />
          </Form>

          <Button text="Sign Up" />
          <LinkText href="to" text="Clic here to login" />
        </BGTemplate>
    );
  }
}

export default SignUp;
