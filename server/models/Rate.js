const mongoose = require("mongoose");
const ReviewReply = require("./ReviewReply");

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

const RateSchema = new mongoose.Schema(
  {
    user: {
      //user id
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    review: {
      //review text is not required
      type: String,
    },
    movie: {
      //TMDB movie id
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    likes: {
      //array of user ids
      type: Array,
    },
    replies: [ReviewReplySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", RateSchema);
