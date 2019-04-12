import React from "react";
import { Link } from "react-router-dom";
import "./LinkText.css";

const LinkText = props => {
  let styles = "link_text " + props.styles;
  return (
    <Link className={styles} to={props.to}>
      {props.text}
    </Link>
  );
};

export default LinkText;
