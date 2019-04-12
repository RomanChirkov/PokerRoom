import React from "react";
import "./Form.css";

const Form = props => {
  let styles = "form " + props.styles;
  return <form className={styles}>{props.children}</form>;
};

export default Form;
