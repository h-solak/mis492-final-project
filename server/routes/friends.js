const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//remove a friend
router.delete("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user2id = req.body.userId;
    const user = await User.findById(id);
    const user2 = await User.findById(user2id);

    user.friends = user.friends.filter((friend) => friend.id != user2id);
    user.save();
    user2.friends = user.friends.filter((friend) => friend.id != id);
    user2.save();

    res.status(200).json({ friends: user.friends });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Send a friend request
router.post("/request", checkJwt, async (req, res) => {
  try {
    const senderId = getUserIdFromToken(req.headers.authorization);
    const receiverId = req.body.userId;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    //check if the same request exists
    const requestAlreadyExists =
      sender.pendingFriendRequests.find(
        (request) =>
          request.receiver == receiverId && request.sender == senderId
      ) ||
      sender.pendingFriendRequests.find(
        (request) =>
          request.senderId == receiverId && request.sender == receiverId
      ) ||
      receiver.pendingFriendRequests.find(
        (request) =>
          request.receiver == receiverId && request.sender == senderId
      ) ||
      receiver.pendingFriendRequests.find(
        (request) =>
          request.senderId == receiverId && request.sender == receiverId
      );

    const usersAreAlreadyFriend =
      sender.friends.find((friend) => friend.id == receiverId) ||
      receiver.friends.find((friend) => friend.id == senderId);

    //if the request doesn't exist
    if (!requestAlreadyExists && !usersAreAlreadyFriend) {
      const request = {
        receiver: receiverId,
        sender: senderId,
      };
      const newReceiverRequests = [...receiver.pendingFriendRequests, request];
      receiver.pendingFriendRequests = newReceiverRequests;
      await receiver.save();
      const newSenderRequests = [...sender.pendingFriendRequests, request];
      sender.pendingFriendRequests = newSenderRequests;
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

//Accept or Reject a request
router.put("/request", checkJwt, async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const senderId = req.body.sender;
    const receiverId = req.body.receiver;
    const action = req.body.action; //"reject"/"accept"
    const userIsSender = userId == senderId;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    const usersAreAlreadyFriend =
      sender.friends.find((friend) => friend.id == receiverId) ||
      receiver.friends.find((friend) => friend.id == senderId);

    if (!usersAreAlreadyFriend) {
      /* Accept */
      if (action == "accept") {
        sender.friends.push({
          id: receiverId,
          type: "default", //default or match
        });
        receiver.friends.push({
          id: senderId,
          type: "default",
        });
      }
      /* Reject - Do nothing spesific */

      //Handle new requests after action
      const newReceiverRequests = receiver.pendingFriendRequests.filter(
        (requestItem) =>
          !(
            requestItem.sender == senderId && requestItem.receiver == receiverId
          )
      );
      receiver.pendingFriendRequests = newReceiverRequests;
      await receiver.save();
      const newSenderRequests = sender.pendingFriendRequests.filter(
        (requestItem) =>
          !(
            requestItem.sender == senderId && requestItem.receiver == receiverId
          )
      );
      sender.pendingFriendRequests = newSenderRequests;
      await sender.save();
    } else {
      res.status(500).json({
        error: "The request exists or you are already friends!",
      });
    }

    const newPendingRequests = userIsSender
      ? sender.pendingFriendRequests
      : receiver.pendingFriendRequests;

    const newFriends = userIsSender ? sender.friends : receiver.friends;

    res
      .status(200)
      .json({ pendingFriendRequests: newPendingRequests, friends: newFriends });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Cancel a request
router.delete("/request", checkJwt, async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const senderId = req.body.sender;
    const receiverId = req.body.receiver;

    console.log(req.body);
    const userIsSender = userId == senderId;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    console.log(senderId, receiverId);

    //Handle delete the request from both users
    const newReceiverRequests = receiver.pendingFriendRequests.filter(
      (requestItem) =>
        !(requestItem.sender == senderId && requestItem.receiver == receiverId)
    );
    receiver.pendingFriendRequests = newReceiverRequests;
    await receiver.save();
    const newSenderRequests = sender.pendingFriendRequests.filter(
      (requestItem) =>
        !(requestItem.sender == senderId && requestItem.receiver == receiverId)
    );
    sender.pendingFriendRequests = newSenderRequests;
    await sender.save();

    const newPendingRequests = userIsSender
      ? sender?.pendingFriendRequests
      : receiver?.pendingFriendRequests;
    res.status(200).json({ pendingFriendRequests: newPendingRequests });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
