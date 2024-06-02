const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const movieSchema = new Schema(
  {
    // Define the structure of the movie object here
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    release_date: {
      type: String || Date,
    },
  },
  { _id: false }
); // Prevents Mongoose from adding an _id field to each movie object

const watchlistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  creator: {
    //id of the creator user
    type: String,
    required: true,
  },
  collaborators: {
    //array of user ids. If array.length > 0 --> collaborative playlist
    type: Array,
    default: [],
  },
  movies: [movieSchema],
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
