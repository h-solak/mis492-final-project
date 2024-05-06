const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

/* Routes */
const userRoute = require("./routes/user");
const usersRoute = require("./routes/users");
const friendsRoute = require("./routes/friends");
const matchRoute = require("./routes/match");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const chatRoute = require("./routes/chats");
const movieRoute = require("./routes/movie");
const watchlistRoute = require("./routes/watchlist");

dotenv.config();
//middleware
app.use(express.json()); //body parser
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/users", usersRoute);
app.use("/api/friends", friendsRoute);
app.use("/api/match", matchRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/movie", movieRoute);
app.use("/api/watchlist", watchlistRoute);

// Create GET request
app.get("/", (req, res) => {
  res.send("MovieMate API");
});

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("connected to MongoDB");
    app.listen(5900, () => console.log("backend connected 5900"));
  })
  .catch((err) => {
    console.log(err);
  });

//prevents from crashing after errors
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
