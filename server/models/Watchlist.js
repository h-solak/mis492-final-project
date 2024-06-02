const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema(
  {
    title: {
      //id of the creator user
      type: String,
      required: true,
    },
    creator: {
      //id of the creator user
      type: String,
      required: true,
    },
    // type: {
    //   type: String,
    //   default: "default", //default (1 user) or collaborative
    // },
    collaborators: {
      //if array.length > 0 --> collaborative playlist
      type: Array,
      default: [],
    },
    movies: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchlist", WatchlistSchema);
