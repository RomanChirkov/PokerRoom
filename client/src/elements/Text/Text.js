import React from "react";
import PropTypes from "prop-types";
import "./Text.css";

const Text = ({ styles, text }) => {
  styles = "text " + (styles || "");
  return <p className={styles}>{text}</p>;
};

Text.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Text;
