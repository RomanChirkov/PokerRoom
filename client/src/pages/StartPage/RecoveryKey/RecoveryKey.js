import React, { Component } from "react";
import "./RecoveryKey.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../elements/Button/Button";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

const helpText = "We send the recovery key to your mail.";

class RecoveryKey extends Component {
  render() {
    return (
      <BGTemplate>
        <Text styles="text-recovery_key" text={helpText} />
        <Form styles="form_recovery_key">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input placeholder="Recovery key" />
        </Form>
        <LinkText
          styles="flex-right form-link_text"
          to="/recovery_key"
          text="Resend key"
        />

        <Button styles="button-fixed" text="Confirm" />
        <LinkText
          styles="flex-left"
          to="/reset_password"
          text="< change mail"
        />
      </BGTemplate>
    );
  }
}

export default RecoveryKey;
