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

          <Form>
            <Input />
            <Input />
            <Input />
            <Input />

            <Button text="Sign Up" />
            <LinkText href="to" text="Clic here to login" />
          </Form>
          
        </BGTemplate>
    );
  }
}

export default SignUp;
