const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    //username
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // read: {
    //   type: Boolean,
    // },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = {
  Message, //this will be used inside the router functions
  MessageSchema, //this is for Chat Schema
};
