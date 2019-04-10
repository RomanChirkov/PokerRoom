import React from "react";
import "./Form.css";

const Form = props => {
  return <form className="input">{props.children}</form>;
};

export default Form;
