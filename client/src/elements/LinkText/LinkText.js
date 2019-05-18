import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./LinkText.css";

const LinkText = ({ className, to, text, onClick }) => {
  className = "link_text " + (className || "");
  if (!to && onClick) {
    return (
      <div onClick={onClick} className={className}>
        {text}
      </div>
    );
  }
  return (
    <Link className={className} to={to}>
      {text}
    </Link>
  );
};

LinkText.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func
};

export default LinkText;
