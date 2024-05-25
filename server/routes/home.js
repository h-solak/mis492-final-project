const router = require("express").Router();
const Rate = require("../models/Rate");
const User = require("../models/User");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//get user home page data (now watching...)
router.get("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user = await User.findById(id);

    const friendsData = await Promise.all(
      user.friends.map(async (friend) => {
        const userData = await User.findById(friend?.id);
        const userMovieRates = await Rate.find({
          user: userData._id,
        }).limit(4);
        return {
          id: userData._id,
          username: userData.username,
          nowWatching: userData?.nowWatching,
          rates: userMovieRates,
        };
      })
    );

    return res.status(200).json({ home: friendsData });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
