import React, { Component } from "react";
import "./NewPassword.css";

import Button from "../../../elements/Button/Button";
import BGTemplate from "../BGTemplate";
import Input from "../../../elements/Input/Input";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

const helpText = "Create new password.";

class LogIn extends Component {
  render() {
    return (
      <BGTemplate>
        <Text className="text-reset_password" text={helpText} />
        <Form className="form_new-password">
          <Input empty />
          <Input empty />
          <Input placeholder="Password" />
          <Input placeholder="Confirm password" />
        </Form>

        <Button text="Confirm" />
      </BGTemplate>
    );
  }
}

export default LogIn;
