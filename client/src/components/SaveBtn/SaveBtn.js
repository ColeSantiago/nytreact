import React from "react";
import "./SaveBtn.css";

const SaveBtn = props => (
  <button className="save-btn" {...props}>
   {props.children}
  </button>
);

export default SaveBtn;