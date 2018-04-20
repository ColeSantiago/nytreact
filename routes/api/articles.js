const config = require("../../config");
const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router.route("/")
  .get(articlesController.findAll);

router.route('/')
  .post(articlesController.create);

router
  .route("/:id")
  .delete(articlesController.remove);

router.get("/search", (req, res) => {
	let url;

  if (req.query.begin_date && req.query.end_date)  {
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${config.myKey}&q=${req.query.q}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}`;
  } else {
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${config.myKey}&q=${req.query.q}`
  }

  axios.get(url)
    .then(function(results) {
    	res.json(results.data.response.docs)
    })
    .catch(err => res.status(422).json(err.response));
});

module.exports = router;

