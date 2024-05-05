const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//create a new watchlist
router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const title = req.body.title;

    const newWatchlist = new Watchlist({
      creator: id,
      title: title,
    });

    return res.status(200).json({ watchlist: newWatchlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
