const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rate", RateSchema);
