import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

import Button from "./Elements/Button/Button";
import BGTemplate from "./Pages/StartPage/BGTemplate";
import Input from "./Elements/Input/Input";
import LinkText from "./Elements/LinkText/LinkText";
import Text from "./Elements/Text/Text";

class App extends Component {
  render() {
    return (
      <Router>
        <BGTemplate>
          <Text text="kuku" />
          <Input />
          <Button text="Button" />
          <LinkText href="to" text="to" />
        </BGTemplate>
      </Router>
    );
  }
}

export default App;
