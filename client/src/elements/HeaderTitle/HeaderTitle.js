import React from "react";
import PropTypes from "prop-types";
import "./HeaderTitle.css";

const HeaderTitle = ({ styles }) => {
  styles = "header_title " + (styles || "");
  return <h1 className={styles}>PokerRoom</h1>;
};

HeaderTitle.propTypes = {
  styles: PropTypes.string
};

export default HeaderTitle;
