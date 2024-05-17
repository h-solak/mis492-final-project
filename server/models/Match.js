const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
