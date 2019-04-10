import React, { Component } from "react";
import "./BGTemplate.css";

import HeaderTitle from "../../Elements/HeaderTitle/HeaderTitle";

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
