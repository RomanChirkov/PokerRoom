import React from "react";
import "./Input.css";

const Input = props => {
  if (props.empty) {
    return <div className="input-empty" />;
  }
  return <input className="input" placeholder={props.placeholder} />;
};

export default Input;
