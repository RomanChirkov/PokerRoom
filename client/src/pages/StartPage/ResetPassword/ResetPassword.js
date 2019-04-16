import React, { Component } from "react";
import "./ResetPassword.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../elements/Button/Button";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

import { validateEmail } from "../../../modules/helpers";
const helpText =
  "We can help you to reset your password using your mail address linked to your account.";

class ResetPassword extends Component {
  onButtonClick = e => {
    console.log(e);
  };

  onInputChange = e => {
    let mail = e.target.value;
    // console.log(validateEmail(mail), mail);
  };

  render() {
    return (
      <BGTemplate>
        <Text styles="text-reset_password" text={helpText} />
        <Form styles="form_reset_password">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input
            type="mail"
            onChange={this.onInputChange}
            placeholder="Email address"
          />
        </Form>

        <Button
          onClick={this.onButtonClick}
          styles="button-fixed"
          text="Send recovery key"
        />
        <LinkText styles="flex-left" to="/login" text="< go back" />
      </BGTemplate>
    );
  }
}

export default ResetPassword;
