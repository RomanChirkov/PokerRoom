import React, { Component } from "react";
import "./ResetPassword.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../Elements/Button/Button";
import Input from "../../../Elements/Input/Input";
import LinkText from "../../../Elements/LinkText/LinkText";
import Form from "../../../Elements/Form/Form";
import Text from "../../../Elements/Text/Text";

const helpText =
  "We can help you to reset your password using your email address linked to your account.";

class ResetPassword extends Component {
  render() {
    return (
      <BGTemplate>
        <Text styles="text-reset_password" text={helpText} />
        <Form styles="form_reset_password">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input placeholder="Email address" />
        </Form>

        <Button styles="button-fixed" text="Send recovery key" />
        <LinkText styles="flex-left" to="/login" text="< go back" />
      </BGTemplate>
    );
  }
}

export default ResetPassword;
