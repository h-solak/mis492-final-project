const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//add movie to favorites
router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movieId = req.body.movieId;
    const user = await User.findById(id);

    let newFavorites = user?.favorites || [];
    newFavorites.push(movieId);

    user.favorites = newFavorites;
    await user.save();

    return res.status(200).json({ favorites: newFavorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//remove movie from favorites
router.delete("/:movieId", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movieId = req.params.movieId;
    const user = await User.findById(id);

    let newFavorites = user?.favorites || [];
    newFavorites = newFavorites?.filter((item) => item != movieId);

    user.favorites = newFavorites;
    await user.save();

    return res.status(200).json({ favorites: newFavorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
