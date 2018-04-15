const router = require("express").Router();
const booksController = require("../../controllers/articlesController");

// Matches with "/api/books"
router.route("/")
  .get(articlesController.findAll)

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);

module.exports = router;