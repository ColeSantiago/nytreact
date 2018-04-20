import React from "react";
import "./Form.css"

export const Input = props => (
  <div className="form-div">
    <input className="form-input" {...props} />
  </div>
);