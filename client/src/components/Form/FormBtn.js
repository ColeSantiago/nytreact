import React from "react";

export const FormBtn = props => (
  <button {...props} className="FormBtn">
    {props.children}
  </button>
);