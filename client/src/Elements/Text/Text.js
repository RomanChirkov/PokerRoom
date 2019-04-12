import React from "react";
import "./Text.css";

const Text = props => {
  let styles = "text " + props.styles;
  return <p className={styles}>{props.text}</p>;
};

export default Text;
