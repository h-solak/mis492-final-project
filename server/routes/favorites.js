const router = require("express").Router();
const User = require("../models/User");
const Watchlist = require("../models/Watchlist");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//add movie to favorites
router.post("/", checkJwt, async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const id = req.body.id;
    const title = req.body.title;
    const poster_path = req.body.posterPath;
    const release_date = req.body.releaseDate;

    const user = await User.findById(userId);

    let newFavorites = user?.favoriteMovies || [];
    newFavorites.push({
      id,
      title,
      poster_path,
      release_date,
    });

    user.favoriteMovies = newFavorites;
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

    let newFavorites = user?.favoriteMovies || [];
    newFavorites = newFavorites?.filter((item) => item?.id != movieId);

    user.favoriteMovies = newFavorites;
    await user.save();

    return res.status(200).json({ favorites: newFavorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
