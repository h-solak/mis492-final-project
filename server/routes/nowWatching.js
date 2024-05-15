const router = require("express").Router();
const User = require("../models/User");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

router.post("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movie = req.body.movie;
    const user = await User.findById(id);
    const nowWatchingObj = {
      ...movie,
      watchDate: new Date(),
    };
    user.nowWatching = nowWatchingObj;
    await user.save();
    return res.status(200).json({ nowWatching: user.nowWatching });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(id);
    user.nowWatching = {};
    await user.save();
    return res.status(200).json({ nowWatching: user.nowWatching });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

// MOVIE
// {
//     "adult": false,
//     "backdrop_path": null,
//     "genre_ids": [],
//     "id": 1273895,
//     "original_language": "en",
//     "original_title": "Before",
//     "overview": "Chris and Eric - a young gay couple on the precipice of surrogating their first child - have a late night conversation in which they consider the future and the ramifications of leaving their \"before.\"",
//     "popularity": 2.155,
//     "poster_path": "/uezivVbIdY4LbhoVy8EmqBat5dx.jpg",
//     "release_date": "2024-03-23",
//     "title": "Before",
//     "video": false,
//     "vote_average": 0.0,
//     "vote_count": 0
// },
