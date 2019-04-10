import React from "react";
import "./Button.css";

const Button = props => {
  return <button className="button-default">{props.text}</button>;
};

export default Button;
