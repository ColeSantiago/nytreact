const axios = require("axios");
const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

router.route("/")
  .get(articlesController.findAll)

router
  .route("/:id")
  .delete(articlesController.remove);

router.get("/search", (req, res) => {
	let apiKey = "89044b6859ce47ef848bcbb0adc487e8"
	let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${req.query.q}&?begin_date=${req.query.begin_date}&?end_date=${req.query.end_date}`;
  axios.get(url)
    .then(function(results) {
    	res.json(results.data.response.docs)
    })
    .catch(err => res.status(422).json(err.response));
});

module.exports = router;

