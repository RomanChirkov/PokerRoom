import React, { Component } from "react";
import "./App.css";

import Button from "./Elements/Button/Button";
import BGTemplate from "./Pages/StartPage/BGTemplate";
import HeaderTitle from "./Elements/HeaderTitle/HeaderTitle";
// import Input from "./Elements/Input/Input";

class App extends Component {
  render() {
    return (
      <BGTemplate>
        <HeaderTitle />
        {/* <Input />  */}
        <Button text="Button" />
      </BGTemplate>
    );
  }
}

export default App;
