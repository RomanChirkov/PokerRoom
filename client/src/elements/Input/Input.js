import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  let styles = (props.styles || "") + " input";
  if (props.empty) {
    styles += "-empty";
    return <div className={styles} />;
  }
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={styles}
      placeholder={props.placeholder}
    />
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  empty: PropTypes.bool,
  onChange: PropTypes.func,
  styles: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;
