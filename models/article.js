const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  headline: { type: String, required: true, unique: true },
  link: { type: String, required: true },
  date: { type: String },
  snippet: { type: String },  
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;