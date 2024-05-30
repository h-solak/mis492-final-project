const User = require("../models/User");
const Chat = require("../models/Chat");
const router = require("express").Router();
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");
const sortByDate = require("../utils/sortByDate");
const isMessageRead = require("../utils/isMessageRead");
const { ObjectId } = require("mongodb");

//GET CHAT LIST - PREVIEWS
router.get("/", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);

    //find all chats of the user
    const chats = await Chat.aggregate([
      {
        $match: { "participants.id": id },
      },
    ]);

    let previewChats = [];

    if (chats) {
      //Get other user id's to get their info
      const otherUserIds = chats.map((chatItem) => {
        if (chatItem.participants[0].id == id) {
          return chatItem.participants[1].id;
        } else {
          return chatItem.participants[0].id;
        }
      });

      //create chat previews
      await Promise.all(
        otherUserIds?.map(async (userId, index) => {
          const chatData = chats[index];
          const userData = await User.findById(userId);
          const lastMessage = chatData?.messages
            ? chatData?.messages[chatData?.messages?.length - 1]
            : {};

          const lastReadDate =
            chatData.participants[0].id == id
              ? chatData.participants[0]?.read
              : chatData.participants[1]?.read;

          let unreadMessagesCount = 0;
          chatData?.messages.slice(-11).forEach((messageItem) => {
            isMessageRead(messageItem?.createdAt, lastReadDate)
              ? null
              : unreadMessagesCount++;
          });

          const newPreview = {
            chatId: chatData?._id,
            lastMessage: lastMessage || {},
            username: userData?.username,
            userAvatar: userData?.crrAvatar,
            unreadMessagesCount: unreadMessagesCount,
          };
          previewChats.push(newPreview);
        })
      );
    }

    //sort latest date first
    const sortedPreviewChats = previewChats.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    return res.status(200).json({ chats: sortedPreviewChats });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//GET A SPESIFIC CHAT BY CHAT ID
router.get("/:chatId", checkJwt, async (req, res) => {
  const id = getUserIdFromToken(req.headers.authorization);
  const chatId = req.params.chatId;
  try {
    let chat = await Chat.findById(chatId);

    //change message read status
    await Chat.findByIdAndUpdate(
      chatId,
      { $set: { "participants.$[elem].read": new Date() } },
      { new: true, arrayFilters: [{ "elem.id": id }] }
    );

    /* IMPLEMENT HERE */

    //get the info of the other user
    const receiverId = chat?.participants?.filter(
      (participant) => participant.id != id
    )[0]?.id;
    const receiverData = await User.findById(receiverId);
    let newReceiverData = {
      receiver: {
        id: receiverData?._id,
        username: receiverData?.username,
        avatar: receiverData?.crrAvatar,
        personality: receiverData?.personality,
      },
    };
    const currentChat = { ...chat._doc, ...newReceiverData };
    return res.status(200).json({ chat: currentChat });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//GET (OR CREATE IF DOESN'T EXIST) CHAT ID OF TWO USERS
router.get("/user/:user2Id", checkJwt, async (req, res) => {
  try {
    const id = getUserIdFromToken(req.headers.authorization);
    const user2Id = req.params.user2Id;
    const isMatchChat = req?.query?.isMatchChat || "no";

    const chat = await Chat.findOne({
      "participants.id": { $all: [id, user2Id] },
    });

    if (chat?._id) {
      return res.status(200).json({ chatId: chat?._id });
    } else {
      const crrDate = new Date();
      const user1Obj = {
        id: id,
        read: crrDate,
      };
      const user2Obj = {
        id: user2Id,
        read: crrDate,
      };

      const newChat = new Chat({
        participants: [user1Obj, user2Obj],
      });

      if (isMatchChat == "yes") {
        const newObjectId = new ObjectId();
        const date = new Date();
        const newMessage = {
          sender: "moviemate",
          content: "You are matched!🔥",
          createdAt: date,
          id: newObjectId.toString(),
        };
        newChat?.messages.push(newMessage);
      }

      await newChat.save();
      return res.status(200).json({ chatId: newChat?._id });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
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
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: newMessage } });

    return res.status(200).json({ chatId: chatId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
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
    return res.status(200).json({ chatId: chatId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Update a user's last time on the chat (To check if the user has read the message or not)
router.put("/:chatId/read", checkJwt, async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const messageId = req.params.messageId;
    await Chat.findByIdAndUpdate(chatId, {
      $pull: { messages: { _id: messageId } },
    });
    return res.status(200).json({ chatId: chatId });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// /********NOT IMPLEMENTED AND PROBABLY WONT BE*********** */
// //CHAT SUGGESTIONS (WILL INCLUDE PEOPLE WE DIDNT CHAT BEFORE AND WE FOLLOW)
// router.get("/suggestions/:userId", checkJwt, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     const followings = await Promise.all(
//       user.followings.map(async (followingId) => {
//         const data = await User.findById(followingId);
//         return {
//           userId: data._id,
//           username: data.username,
//           crrAvatar: data.crrAvatar,
//           //followers: suggestedUser.followers,
//         };
//       })
//     );
//     return res.status(200).json({
//       data: followings,
//     });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;
