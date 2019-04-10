import React from "react";
import "./From.css";

const Form = props => {
  return <form className="input">{props.children}</form>;
};

export default Form;
