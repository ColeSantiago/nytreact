import React from "react";
import "./List.css";

export const ListItem = props => (
  <li className="list-group-item">
    <a className="headline" href={props.link} target="_blank">{props.headline}</a>
    <div className="date">{props.date}</div>
    <div className="snippet">{props.snippet}</div> 
    {props.children}
  </li>
);