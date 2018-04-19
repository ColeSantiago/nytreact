import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    begin_date: "",
    end_date: ""
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

  saveArticle = (id) => {
    const findArticle = this.state.articles.find((article) => article._id === id);

      API.saveArticle({ 
      		headline: findArticle.headline.main,
    		link: findArticle.web_url,
    		date: findArticle.pub_date,
    		snippet: findArticle.snippet })
     	.then(res => this.loadArticles(res.data))
        .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.searchArticles({
        topic: this.state.topic,
        begin_date: this.state.begin_date,
        end_date: this.state.end_date
      })
      .then(res => {
        console.log(res.data); 
        this.setState({ articles: res.data })
      })
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
    	<Wrapper>
	    	<h1>Search New York Times Articles</h1>
	        <form>
	        	<Input
	            	value={this.state.topic}
	                onChange={this.handleInputChange}
	                name="topic"
	                placeholder="topic (required)"
	              />
	              <Input
	                value={this.state.begin_date}
	                onChange={this.handleInputChange}
	                name="begin_date"
	                placeholder="Start Year (Optional)"
	              />
	              <Input
	                value={this.state.end_date}
	                onChange={this.handleInputChange}
	                name="end_date"
	                placeholder="End Year (Optional)"
	              />
	              <FormBtn
	                disabled={!(this.state.topic)}
	                onClick={this.handleFormSubmit}
	              >
	                Search
	              </FormBtn>
	        </form>
	        <h1>Results</h1>   
	        {this.state.articles.length ? (
	        	<List>
	            	{this.state.articles.map(article => (
	                	<ListItem 
	                		key={article._id}
	                		_id={article._id} 
	                		headline={article.headline.main} 
	                		date={article.pub_date}
	                		snippet={article.snippet}
	                		link={article.web_url}
	                	>
		                <SaveBtn onClick={() => this.saveArticle(article._id)} />
	             		</ListItem>
	                ))}

	            </List>
	        ) : (
	        <h3>No Results to Display</h3>
	        )}

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

export default Articles;
