import React from "react";
import PropTypes from "prop-types";
import "./HeaderTitle.css";

const HeaderTitle = ({ className }) => {
  className = "header_title " + (className || "");
  return <h1 className={className}>PokerRoom</h1>;
};

HeaderTitle.propTypes = {
  className: PropTypes.string
};

export default HeaderTitle;
