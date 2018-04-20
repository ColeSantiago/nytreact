import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
	<nav className="navbar">
		<ul>
			<li>
		  		<Link className="navbar-link" to="/">
		    		New York Times Articles
		    	</Link>
		  	</li>
		  	<li>
	   			<Link className="navbar-link" to="/saved/articles">
	    			Saved Articles
	    		</Link>
	  		</li>
	  	</ul>
  </nav>
);

export default Nav;