import React from "react";
import "./Form.css"

export const FormBtn = props => (
  <button onClick={props.onClick} {...props} className="FormBtn">
    {props.children}
  </button>
);