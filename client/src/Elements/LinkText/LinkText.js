import React from "react";
import "./LinkText.css";

const LinkText = props => {
  return (
    <p>
      <a className="link_text" href={props.href}>
        {props.text}
      </a>
    </p>
  );
};

export default LinkText;
