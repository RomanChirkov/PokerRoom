import React from "react";
import "./From.css";

const From = props => {
  return <form className="input">{props.children}</form>;
};

export default From;
