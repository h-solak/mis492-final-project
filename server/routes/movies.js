const router = require("express").Router();
const Rate = require("../models/Rate");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//Get a user's rates
router.get("/rate", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const usersRates = await Rate.find({
      user: id,
    });

    res.status(200).json({ rates: usersRates });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Editing existing rates
router.put("/rate", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const movie = req.body.movie;
    const newRate = req.body.rate;
    await Rate.findOneAndUpdate(
      {
        //query
        user: id,
        movie: movie,
      },
      {
        //update
        rate: newRate,
      }
    );

    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Rate a movie
router.post("/rate", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const rate = req.body.rate;
    const movie = req.body.movie;
    const alreadyRated = await Rate.findOne({
      user: id,
      movie: movie,
    });
    console.log("????????", alreadyRated);

    //if user haven't rated the movie before, post it..
    if (!alreadyRated) {
      const newRate = await new Rate({
        user: id,
        movie: movie,
        rate: rate,
      });
      await newRate.save();
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
