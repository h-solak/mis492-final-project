const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");

//get users by searching
router.get("/:username", checkJwt, async (req, res) => {
  try {
    const regex = new RegExp(req.params.username, "i"); // "i" makes the search case-insensitive
    const userList = await User.find({ username: regex });
    console.log(userList);

    const filteredUserList = userList?.map((userItem) => {
      const { password, privateChats, ...otherUserData } = userItem._doc;
      return otherUserData;
    });
    console.log(userList);
    res.status(200).json({ users: filteredUserList });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
