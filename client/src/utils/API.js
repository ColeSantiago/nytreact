import axios from "axios";

export default {
  searchArticles: function(query) {
    console.log(query);
    return axios.get("/api/articles/search", 
      { 
        params: 
          { 
            q: query.topic, 
            begin_date: query.begin_date,
            end_date: query.end_date,
          } 
      });
  },
  getArticles: function() {
    return axios.get("/api/articles");
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
