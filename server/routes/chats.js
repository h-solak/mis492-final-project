const User = require("../models/User");
const Chat = require("../models/Chat/Chat");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//GET CHAT LIST
router.get("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);

    //create chat
    // const newChat = new Chat({
    //   participants: [id, "65e081df6c869075db0b6f16"],
    //   messages: [],
    // });
    // await newChat.save();

    const chats = await Chat.find({
      participants: id,
    });

    let previewChats = [];

    if (chats) {
      const otherUserIds = chats.map((item) => {
        if (item.participants[0] == id) {
          return item.participants[1];
        } else {
          return item.participants[0];
        }
      });

      await Promise.all(
        otherUserIds?.map(async (userId, index) => {
          const chatData = chats[index];
          const userData = await User.findById(userId);
          const lastMessage = chatData?.messages
            ? chatData?.messages[chatData?.messages?.length - 1]
            : {};
          const newPreview = {
            chatId: chatData?.id, // or _id???
            lastMessage: lastMessage || {},
            username: userData?.username,
            userAvatar: userData?.crrAvatar,
          };
          console.log(newPreview);
          previewChats.push(newPreview);
        })
      );
    }

    /*
   Should be sorted by lastMessage date!!!!!!!!!!!!!!
   */

    res.status(200).json({ chats: previewChats });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET A SPESIFIC CHAT OR CREATE IF USERS DON'T HAVE ONE
router.get("/dm/:username2/:username1", checkJwt, async (req, res) => {
  try {
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
