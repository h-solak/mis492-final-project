const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    usernames: {
      type: Array,
      default: [],
      required: true,
      // unique: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); //whenever a new user is created, timestamps will be updated

module.exports = mongoose.model("Chat", ChatSchema);
