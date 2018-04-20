const db = require("../models");

module.exports = {
  
  // finds everything in the database and sends it to the html
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  // will insert the article the user wants to save
  create: function(req, res) {
    db.Article.create(req.body)
      .then(function(dbModel) {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  // will delete the articles
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};