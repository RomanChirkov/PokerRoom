import React, { Component } from "react";
import "./BGTemplate.css";

class BGTemplate extends Component {
  render() {
    console.log(this.props);
    return <div className="backround_wrapper">{this.props.children}</div>;
  }
}

export default BGTemplate;