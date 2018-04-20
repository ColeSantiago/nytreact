const config = require("../../config");
const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// home route to find all articles and create new ones
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);
 
// route to delete articles 
router.route("/:id")
  .delete(articlesController.remove);

// route to search the new york times api
router.get("/search", (req, res) => {
	let url;

  // if there are begin and end years
  if (req.query.begin_date && req.query.end_date)  {
    url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${config.myKey}&q=${req.query.q}&begin_date=${req.query.begin_date}&end_date=${req.query.end_date}`;
  // if there arent any years
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

