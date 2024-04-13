const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//Send a friend request
router.post("/:userId", checkJwt, async (req, res) => {
  try {
    const senderId = getUserIdFromToken(req.headers.authorization);
    const receiverId = req.params.userId;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    //check if the same request exists
    const requestAlreadyExists =
      sender.pendingFriendRequests.find(
        (item) => item.receiver == receiverId && item.sender == senderId
      ) ||
      sender.pendingFriendRequests.find(
        (item) => item.senderId == receiverId && item.sender == receiverId
      );

    const usersAreAlreadyFriend =
      sender.friends.includes(receiverId) ||
      receiver.friends.includes(senderId);

    if (!requestAlreadyExists && !usersAreAlreadyFriend) {
      //if the request doesn't exist
      const request = {
        receiver: receiverId,
        sender: senderId,
      };
      receiver.pendingFriendRequests.push(request);
      await receiver.save();
      sender.pendingFriendRequests.push(request);
      await sender.save();
    } else {
      res.status(500).json({
        error: "The request exists or you are already friends!",
      });
    }

    res
      .status(200)
      .json({ pendingFriendRequests: sender.pendingFriendRequests });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
