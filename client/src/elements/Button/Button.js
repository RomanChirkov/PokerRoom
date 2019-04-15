import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ onClick, text, styles }) => {
  styles = "button-default " + (styles || "");
  return (
    <button onClick={onClick} className={styles}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  styles: PropTypes.string
};

export default Button;
