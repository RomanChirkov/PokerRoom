import React from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = props => {
  let className = (props.className || "") + " input";
  if (props.empty) {
    className += "-empty";
    return <div className={className} />;
  }
  return (
    <input
      id={props.id}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className={className}
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
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Input;
