import React from "react";
import "../List/List.css";

const SaveBtn = props => (
  <button className="btn" {...props}>
   {props.children}
  </button>
);

export default SaveBtn;