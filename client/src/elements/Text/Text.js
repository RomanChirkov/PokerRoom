import React from "react";
import PropTypes from "prop-types";
import "./Text.css";

const Text = ({ className, text }) => {
  className = "text " + (className || "");
  return <p className={className}>{text}</p>;
};

Text.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Text;
