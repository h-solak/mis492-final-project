const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");

//get user(s) display data using array of user ids
router.get("/", checkJwt, async (req, res) => {
  console.log("first");
  try {
    const arrayOfIds = req.query.user_ids.split(",");
    const userList = await Promise.all(
      arrayOfIds.map(async (id) => {
        const data = await User.findById(id);
        const {
          password,
          privateChats,
          pendingFriendRequests,
          ...otherUserData
        } = data._doc;
        return otherUserData;
      })
    );

    console.log(userList);

    res.status(200).json({ users: userList || [] });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//search and get users with username query
router.get("/:usernameQuery", checkJwt, async (req, res) => {
  try {
    const regex = new RegExp(req.params.usernameQuery, "i"); // "i" makes the search case-insensitive
    const userList = await User.find({ username: regex });

    const filteredUserList = userList?.map((userItem) => {
      const { password, privateChats, ...otherUserData } = userItem._doc;
      return otherUserData;
    });
    res.status(200).json({ users: filteredUserList });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
