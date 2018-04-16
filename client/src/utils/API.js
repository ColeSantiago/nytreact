import axios from "axios";

export default {
  searchArticles: function(query) {
    return axios.get("/api/articles", { params: { q: query } });
  },
  // Gets all books
  getArticles: function() {
    return axios.get("/api/saved/articles");
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(bookData) {
    return axios.post("/api/articles");
  }
};
