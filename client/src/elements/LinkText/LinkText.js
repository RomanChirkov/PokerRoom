import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./LinkText.css";

const LinkText = ({ className, to, text }) => {
  className = "link_text " + (className || "");
  return (
    <Link className={className} to={to}>
      {text}
    </Link>
  );
};

LinkText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default LinkText;
