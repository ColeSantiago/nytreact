import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";
import DeleteBtn from "../../components/DeleteBtn";

class Saved extends Component {
  state = {
    saved: [],
  };

  componentDidMount() {
  	this.loadArticles();
  }

  loadArticles = () => {
  	API.getArticles()
    .then(res =>
    	this.setState({ saved: res.data })
   	)
    .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
    .then(res => this.loadArticles())
    .catch(err => console.log(err));
  };

  render() {
    return (
    	<Wrapper>
	       	<h1>Saved Articles</h1>   
	        {this.state.saved.length ? (
	        	<List>
	            	{this.state.saved.map(article => (
	                	<ListItem 
	                		key={article._id}
	                		_id={article._id} 
	                		headline={article.headline} 
	                		date={article.date}
	                		snippet={article.snippet}
	                		link={article.link}
	                	>
							<DeleteBtn onClick={() => this.deleteArticle(article._id)} />
	             		</ListItem>
	                ))}

	            </List>
	        ) : (
	        <h3>You havn't saved any articles yet!</h3>
	        )}
      	</Wrapper> 
    );
  }
}

export default Saved;


