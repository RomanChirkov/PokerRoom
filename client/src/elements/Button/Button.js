import React from "react";
import "./Button.css";

const Button = props => {
  let styles = "button-default " + props.styles;
  return <button className={styles}>{props.text}</button>;
};

export default Button;