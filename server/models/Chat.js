const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        _id: false, //no need for id, we will provide it while creating
        id: String,
        read: Date, //last time user has clicked on chat
      },
    ],
    messages: [
      {
        id: String,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    //users last seen on chat
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
