import React from "react";

export const ListItem = props => (
  <li className="list-group-item">
    <a href={props.link} target="_blank">{props.headline}</a>
    <div className="date">{props.date}</div>
    <div className="snippet">{props.snippet}</div> 
  </li>
);