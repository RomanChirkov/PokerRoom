import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

const Form = ({ styles, children }) => {
  styles = "form " + (styles || "");
  return <form className={styles}>{children}</form>;
};

Form.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node
};

export default Form;
