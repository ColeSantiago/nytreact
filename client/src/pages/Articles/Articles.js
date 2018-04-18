import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    begin_date: "",
    end_date: ""
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
	              
	        {this.state.articles.length ? (
	        	<List>
	            	{this.state.articles.map(article => (
	                	<ListItem 
	                		key={article.headline.main} 
	                		headline={article.headline.main} 
	                		date={article.pub_date}
	                		snippet={article.snippet}
	                		link={article.web_url}
	                	/>  
	                ))}
	            </List>
	        ) : (
	        <h3>No Results to Display</h3>
	        )}
      	</Wrapper> 
    );
  }
}

export default Articles;
