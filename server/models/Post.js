const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      max: 300,
    },
    // img: {
    //   type: String,
    // },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    subcomments: {
      type: Array,
      default: [],
    },
    /*
    subcomment:
      id,
      relatedCommentId, //parent
      content, //text
      userId,
      username,
      avatar
    */
  },
  { timestamps: true }
); //whenever a new user is created, timestamps will be updated

module.exports = mongoose.model("Post", PostSchema);
