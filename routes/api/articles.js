const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/books"
router.route("/")
  .get(articlesController.findAll)

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .delete(articlesController.remove);

router.get("/articles", (req, res) => {
	console.log(req);
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});


module.exports = router;

// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "89044b6859ce47ef848bcbb0adc487e8",
//   'q': "hi"
// });

