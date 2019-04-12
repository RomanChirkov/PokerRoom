import React, { Component } from "./node_modules/react";
import "./BGTemplate.css";
import HeaderTitle from "../../elements/HeaderTitle/HeaderTitle";
var a;

class BGTemplate extends Component {
  render() {
    return (
      <div className="backround_wrapper">
        <HeaderTitle />
        {this.props.children}
      </div>
    );
  }
}

export default BGTemplate;
