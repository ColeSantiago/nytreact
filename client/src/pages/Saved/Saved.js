import React, { Component } from "react";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";
import DeleteBtn from "../../components/DeleteBtn";
import "./Saved.css"

class Saved extends Component {
  state = {
    saved: [],
  };

  // loads all of the articles saved when the page loads
  componentDidMount() {
  	this.loadArticles();
  }

  // function to load the articles
  loadArticles = () => {
  	API.getArticles()
    .then(res =>
    	this.setState({ saved: res.data })
   	)
    .catch(err => console.log(err));
  };

  // function to delete the article
  deleteArticle = id => {
    API.deleteArticle(id)
    .then(res => this.loadArticles())
    .catch(err => console.log(err));
  };

  render() {
    return (
    	<Wrapper>
	       	<h1 className="Saved">Saved Articles</h1>   
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
	        <h3 className="Saved">You haven't saved any articles yet!</h3>
	        )}
      	</Wrapper> 
    );
  }
}

export default Saved;


