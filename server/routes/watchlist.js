const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//create a new watchlist
router.post("/create", checkJwt, async (req, res) => {
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

//add movie to default watchlist
router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movieId = req.body.movieId;
    const user = await User.findById(id);

    let newWatchlist = user?.defaultWatchlist || [];
    newWatchlist.push(movieId);

    user.defaultWatchlist = newWatchlist;
    await user.save();

    return res.status(200).json({ watchlist: newWatchlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//remove movie from default watchlist
router.delete("/:movieId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movieId = req.params.movieId;
    const user = await User.findById(id);

    let newWatchlist = user?.defaultWatchlist || [];
    newWatchlist = newWatchlist?.filter((item) => item != movieId);

    user.defaultWatchlist = newWatchlist;
    await user.save();

    return res.status(200).json({ watchlist: newWatchlist });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//add movie to a custom watchlist
// router.post("/:watchlistId", checkJwt, async (req, res) => {
//   try {
//     const id = getUserIdFromToken(req.headers.authorization);
//     const title = req.body.title;

//     return res.status(200).json({ watchlist: newWatchlist });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

module.exports = router;
