import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import Wrapper from "../../components/Wrapper";
import SaveBtn from "../../components/SaveBtn";
import Checkmark from "../../checkmark.png";
import "./Articles.css";

console.log(Checkmark);

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    begin_date: "",
    end_date: "",
    buttonText: "Save",
    ifSaved: ""
  };

  saveArticle = (id) => {

    const findArticle = this.state.articles.find((article) => article._id === id);

    this.setState({ifSaved:  `${findArticle.headline.main} Saved!`})
  	setTimeout(function(){
    	this.setState({ifSaved: ""})
    }.bind(this),3000);

      API.saveArticle({ 
      		headline: findArticle.headline.main,
    		link: findArticle.web_url,
    		date: findArticle.pub_date,
    		snippet: findArticle.snippet })
     	.then(res => console.log(res.data))
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
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
    }
  };

  render() {
    return (
    	<Wrapper>
	    	<h1 className="main-title">Search New York Times Articles</h1>
	        <form>
	        	<Input
	            	value={this.state.topic}
	                onChange={this.handleInputChange}
	                name="topic"
	                placeholder="Topic (required)"
	              />
	              <Input
	                value={this.state.begin_date}
	                onChange={this.handleInputChange}
	                name="begin_date"
	                placeholder="Start Date YYYYMMDD (Optional)"
	              />
	              <Input
	                value={this.state.end_date}
	                onChange={this.handleInputChange}
	                name="end_date"
	                placeholder="End Date YYYYMMDD (Optional)"
	              />
	              <FormBtn
	                disabled={!(this.state.topic)}
	                onClick={this.handleFormSubmit}
	              >
	                Search
	              </FormBtn>
	        </form>
	        <h1 className="Results">Results</h1> 
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
		                <SaveBtn 
		                	key={article._id}
	                		_id={article._id}
	                		onClick={() => this.saveArticle(article._id)}
	                	>
		                	{this.state.buttonText}
		                </SaveBtn>
		                <div className="ifSaved">{this.state.ifSaved}</div>
	             		</ListItem>
	                ))}
	            </List>
	        ) : (
	        <h3 className="Results">No Results to Display</h3>
	        )}
      	</Wrapper> 
    );
  }
}

export default Articles;
