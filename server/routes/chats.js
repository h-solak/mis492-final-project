const User = require("../models/User");
const Chat = require("../models/Chat");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const sortByDate = require("../utils/sortByDate");

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
          previewChats.push(newPreview);
        })
      );
    }

    /*
   Should be sorted by lastMessage date!!!!!!!!!!!!!!

   ALSO should add the last message
   */

    //sort latest date first
    const sortedPreviewChats = previewChats.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    res.status(200).json({ chats: sortedPreviewChats });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET A SPESIFIC CHAT
router.get("/:chatId", checkJwt, async (req, res) => {
  const id = getUserIdFromToken(req.headers.authorization);
  const chatId = req.params.chatId;
  try {
    let chat = await Chat.findById(chatId);
    //receiver id, username, crrAvatar
    //other user
    const receiverId = chat?.participants?.filter((item) => item != id)[0];
    const receiverData = await User.findById(receiverId);
    let newReceiverData = {
      receiver: {
        id: receiverData?._id,
        username: receiverData?.username,
        avatar: receiverData?.crrAvatar,
      },
    };
    const currentChat = { ...chat._doc, ...newReceiverData };
    res.status(200).json({ chat: currentChat });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//SEND MESSAGE
router.post("/:chatId/message", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const chatId = req.params.chatId;
    const content = req.body.content;
    const newMessage = {
      sender: id,
      content: content,
      createdAt: new Date(),
    };
    console.log(newMessage);
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage } });

    res.status(200).json({ chatId: chatId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a message
router.delete("/:chatId/message/:messageId", checkJwt, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messageId = req.params.messageId;
    await Chat.findByIdAndUpdate(chatId, {
      $pull: { messages: { _id: messageId } },
    });
    res.status(200).json({ chatId: chatId });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/******************* */
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

module.exports = router;
