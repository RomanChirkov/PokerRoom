import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./LinkText.css";

const LinkText = ({ styles, to, text }) => {
  styles = "link_text " + (styles || "");
  return (
    <Link className={styles} to={to}>
      {text}
    </Link>
  );
};

LinkText.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default LinkText;
