import React from "react";
import "./Text.css";

const Text = props => {
    return (
        <p className="text">
            {props.Text}
        </p>
    );
  }

export default Text;
