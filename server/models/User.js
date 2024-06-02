const mongoose = require("mongoose");
const { Schema } = require("mongoose");

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
    /*
    friend requests and matches
      {
        sender: id,
        reciever: id,
        pending: true
      }
    */
    pendingFriendRequests: {
      type: Array,
      default: [],
    },
    desc: {
      type: String,
      default: "Hey there! I am using MovieMate <3",
      max: 50,
    },
    city: {
      type: String,
      max: 50,
      default: "İstanbul",
    },
    watchlists: [watchlistSchema],
    defaultWatchlist: {
      //array of movie ids
      type: Array,
      default: [],
    },
    favoriteMovies: {
      //array of movie ids
      type: Array,
      default: [],
    },
    nowWatching: {},
    birthday: {
      type: Date,
      required: true,
      default: new Date("01/01/2006"),
    },
    gender: {
      type: String,
      required: true,
      default: "female", // male/female (lowercased)
    },
    personality: {
      type: Object,
      default: {
        character: "", //if not assigned, can't use match feature
        resultMatrix: [],
        favoriteMetric: "Fluidity",
      },
    },
    privacy: {
      type: {
        profileVisible: {
          type: Boolean,
          default: true,
        },
        friendsListVisible: {
          type: Boolean,
          default: true,
        },
        matchedFriendsVisible: {
          type: Boolean,
          default: true,
        },
      },
      default: {
        profileVisible: true,
        friendsListVisible: true,
        matchedFriendsVisible: true,
      },
    },
  },
  { timestamps: true }
); //whenever a new user is created, timestamps will be updated

module.exports = mongoose.model("User", UserSchema);
