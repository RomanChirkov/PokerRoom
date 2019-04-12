import React from "react";
import "./HeaderTitle.css";

const HeaderTitle = (props) => {
  let styles = props.styles;
  return <h1 className={styles}>PokerRoom</h1>;
};

export default HeaderTitle;
