import React, { Component } from "react";
import { NativeModules } from "react-native";
// import StartComponent from "./componetns/StartComponent";
import StartPageLayout from "./componetns/StartPageLayout";

export default class App extends Component {
  render() {
    NativeModules.NavBarAndroid.hide();
    return <StartPageLayout />;
  }
}
