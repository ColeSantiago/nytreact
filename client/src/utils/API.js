import axios from "axios";

export default {
  searchArticles: function(query) {
    console.log(query);
    return axios.get("/api/articles/search", { params: { q: query.topic } });
  },
  getArticles: function() {
    return axios.get("/api/articles");
  },
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  saveArticle: function(bookData) {
    return axios.post("/api/articles/save");
  }
};
