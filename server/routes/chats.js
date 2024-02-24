const User = require("../models/User");
const Chat = require("../models/Chat");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");

//GET CHAT LIST
router.get("/:userId", checkJwt, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const allChats = await Promise.all(
      user.privateChats.map(async (otherUser) => {
        const chat = await Chat.findOne({
          usernames: { $all: [user.username, otherUser] },
        });
        const user2 = await User.findOne({ username: otherUser });
        const additionalData = {
          crrAvatar: user2.crrAvatar,
          lastMessage: chat.messages[chat.messages.length - 1],
        };
        //we will also get the last message on chat in future in order to display it on the chat screen...
        const { messages, ...other } = chat._doc;
        const merged = Object.assign(other, additionalData);
        return merged;
      })
    );
    res.status(200).json({ chats: allChats });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET A SPESIFIC CHAT OR CREATE IF USERS DON'T HAVE ONE
router.get("/dm/:username2/:username1", checkJwt, async (req, res) => {
  try {
    const user1 = await User.findOne({ username: req.params.username1 }); //action owner
    const user2 = await User.findOne({ username: req.params.username2 });
    const additionalData = {
      crrAvatar: user2.crrAvatar,
    };
    if (
      !user1.privateChats.includes(user2.username) ||
      !user2.privateChats.includes(user1.username)
    ) {
      const newChat = new Chat({
        usernames: [user1.username, user2.username],
      });
      const chat = await newChat.save();
      await user1.updateOne({
        $push: { privateChats: user2.username },
      });
      await user2.updateOne({
        $push: { privateChats: user1.username },
      });
      const merged = Object.assign(chat._doc, additionalData);
      res.status(200).json({ chat: merged });
    } else {
      const chat = await Chat.findOne({
        usernames: { $all: [req.params.username1, req.params.username2] },
      });
      const merged = Object.assign(chat._doc, additionalData);
      res.status(200).json({ chat: merged });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//CHAT SUGGESTIONS (WILL INCLUDE PEOPLE WE DIDNT CHAT BEFORE AND WE FOLLOW)
router.get("/suggestions/:userId", checkJwt, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const followings = await Promise.all(
      user.followings.map(async (followingId) => {
        const data = await User.findById(followingId);
        return {
          userId: data._id,
          username: data.username,
          crrAvatar: data.crrAvatar,
          //followers: suggestedUser.followers,
        };
      })
    );
    res.status(200).json({
      data: followings,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEND MESSAGE
router.put("/:chatId", checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    // const message = ;
    const chat = await Chat.findById(req.params.chatId);
    //  await chat.updateOne({
    //     $push: { messagges: message },
    //   });
    await chat.updateOne({
      $push: {
        messages: {
          username: user.username,
          text: req.body.messageText,
          time: new Date(),
        },
      },
    });
    const updatedChat = await Chat.findById(req.params.chatId);
    // await post.updateOne({ $push: { likes: req.body.username } });
    res
      .status(200)
      .json({ chatId: updatedChat.chatId, newMessages: updatedChat.messages });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
