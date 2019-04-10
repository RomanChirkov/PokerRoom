import React, { Component } from "react";
import "./App.css";

import Button from "./Elements/Button/Button";
import BGTemplate from "./Pages/StartPage/BGTemplate";

class App extends Component {
  render() {
    return (
      <BGTemplate>
        <Button text="ПРИВЕТ" />
      </BGTemplate>
    );
  }
}

export default App;
