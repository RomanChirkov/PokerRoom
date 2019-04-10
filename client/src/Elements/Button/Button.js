import React, { Component } from "react";
import "./BGTemplate.css";

const Button = props => {
    return (
        <button className="button-default">
            {props.text}
        </button>
    );
  }

export default BGTemplate;
