import React, { Component } from "react";
import "./App.css";

import Button from "./Elements/Button/Button";
import BGTemplate from "./Pages/StartPage/BGTemplate";
import HeaderTitle from "./Elements/HeaderTitle/HeaderTitle";
import Input from "./Elements/Input/Input";
import LinkText from "./Elements/LinkText/LinkText";
import Text from "./Elements/Text/Text";

class App extends Component {
  render() {
    return (
      <BGTemplate>
        <HeaderTitle />
        <Text text="kuku" />
        <Input />
        <Button text="Button" />
        <LinkText href="to" text="to" />
      </BGTemplate>
    );
  }
}

export default App;
