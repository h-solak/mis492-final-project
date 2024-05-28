const User = require("../models/User");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//get friends list of a user
router.get("/:userId", checkJwt, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    const friendPromises =
      user?.friends.map((friendId) => {
        const friend = User.findById(friendId);
        const { password, ...relevantData } = friend?._doc;
        return relevantData;
      }) || [];

    // Wait for all promises to resolve
    const friends = await Promise.all(friendPromises);

    return res.status(200).json({ friends: friends });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//remove a friend
router.delete("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user2id = req.body.userId;
    const user = await User.findById(id);
    const user2 = await User.findById(user2id);

    user.friends = user.friends.filter((friend) => friend.id != user2id);
    await user.save();
    user2.friends = user2.friends.filter((friend) => friend.id != id);
    await user2.save();

    return res.status(200).json({ friends: user.friends });
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
      /*
        Instead of just throwing an error: "The request exists or you are already friends!""
        I will remove the request instead, a bad solution but at least a solution
      */

      sender.pendingFriendRequests = sender?.pendingFriendRequests?.filter(
        (userItem) =>
          !(userItem?.sender == receiverId || userItem?.receiver == receiverId)
      );
      await sender.save();
      receiver.pendingFriendRequests = receiver?.pendingFriendRequests?.filter(
        (userItem) =>
          !(userItem?.sender == senderId || userItem?.receiver == senderId)
      );
      await receiver.save();
    }
    return res
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

    //Since socket is not used for friend requests, this can cause sync issues in the future so we need to make sure..
    const isFriendRequestStillActive =
      sender.pendingFriendRequests.find(
        (request) =>
          request.receiver == receiverId || request.sender == receiverId
      ) &&
      receiver.pendingFriendRequests.find(
        (request) => request.receiver == senderId || request.sender == senderId
      );

    if (!isFriendRequestStillActive) {
      return res.status(500).json({
        error: "The friend request no longer exists!",
      });
    }

    if (usersAreAlreadyFriend) {
      return res.status(500).json({
        error: "The request exists or you are already friends!",
      });
    }

    //Accept action
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
      ? sender.pendingFriendRequests
      : receiver.pendingFriendRequests;

    const newFriends = userIsSender ? sender.friends : receiver.friends;

    return res.status(200).json({
      success: true,
      pendingFriendRequests: newPendingRequests,
      friends: newFriends,
    });
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

    const userIsSender = userId == senderId;
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

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
    return res.status(200).json({ pendingFriendRequests: newPendingRequests });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
