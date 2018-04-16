import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
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
        startYear: this.state.startYear,
        endYear: this.state.endYear
      })
        .then(res => this.setState({ articles: res.data }))
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
	                value={this.state.startYear}
	                onChange={this.handleInputChange}
	                name="startYear"
	                placeholder="Start Year"
	              />
	              <Input
	                value={this.state.endYear}
	                onChange={this.handleInputChange}
	                name="endYear"
	                placeholder="endYear (Optional)"
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
	                	<ListItem key={article._id}>
	                    	{article}
	                  </ListItem>
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
