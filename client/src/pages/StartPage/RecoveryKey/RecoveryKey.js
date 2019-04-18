import React, { Component } from "react";
import "./RecoveryKey.css";

import BGTemplate from "../BGTemplate";
import Button from "../../../elements/Button/Button";
import Input from "../../../elements/Input/Input";
import LinkText from "../../../elements/LinkText/LinkText";
import Form from "../../../elements/Form/Form";
import Text from "../../../elements/Text/Text";

const helpText = "We send the recovery key to your email.";

class RecoveryKey extends Component {
  render() {
    return (
      <BGTemplate>
        <Text className="text-recovery_key" text={helpText} />
        <Form className="form_recovery_key">
          <Input empty />
          <Input empty />
          <Input empty />
          <Input placeholder="Recovery key" />
        </Form>
        <LinkText
          className="flex-right form-link_text"
          to="/recovery_key"
          text="Resend key"
        />

        <Button className="button-fixed" text="Confirm" />
        <LinkText
          className="flex-left"
          to="/reset_password"
          text="< change email"
        />
      </BGTemplate>
    );
  }
}

export default RecoveryKey;
