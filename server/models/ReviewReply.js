const mongoose = require("mongoose");
const ReviewReplySchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: String,
    },
    content: {
      type: String,
    },
    likes: {
      //array of user ids
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReviewReply", ReviewReplySchema);
