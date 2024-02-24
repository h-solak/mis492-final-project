const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   max: 50,
    //   unique: true,
    // },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 20,
    },
    crrAvatar: {
      type: Number,
      default: 0,
    },
    friends: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      default: "Hey there! I am using MovieMatcher <3",
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    privateChats: {
      //will contain other users' usernames
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
); //whenever a new user is created, timestamps will be updated

module.exports = mongoose.model("User", UserSchema);
