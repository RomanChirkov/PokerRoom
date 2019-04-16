import React from "react";
import PropTypes from "prop-types";
import "./Form.css";

const Form = ({ className, children }) => {
  className = "form " + (className || "");
  return <form className={className}>{children}</form>;
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Form;
