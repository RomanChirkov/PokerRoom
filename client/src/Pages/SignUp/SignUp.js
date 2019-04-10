import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./SignUp.css";

import Button from "./Elements/Button/Button";
import BGTemplate from "./Pages/StartPage/BGTemplate";
import Input from "./Elements/Input/Input";
import LinkText from "./Elements/LinkText/LinkText";
import Text from "./Elements/Text/Text";

class SignUp extends Component {
  render() {
    return (
        <BGTemplate>
        
          <Input />
          <Input />
          <Input />
          <Input />

          <Button text="Sign Up" />
          <LinkText href="to" text="Clic here to login" />
        </BGTemplate>
    );
  }
}

export default SignUp;
