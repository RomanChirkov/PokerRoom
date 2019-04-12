import React from "react";
import "./Input.css";

const Input = props => {
  let styles = props.styles + " input";
  if (props.empty) {
    styles += "-empty";
    return <div className={styles} />;
  }
  return <input className={styles} placeholder={props.placeholder} />;
};

export default Input;
