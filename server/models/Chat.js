const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        id: mongoose.Schema.Types.ObjectId,
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
