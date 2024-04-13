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
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const chatRoute = require("./routes/chats");
const movieRoute = require("./routes/movie");

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
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/movie", movieRoute);

// Create GET request
app.get("/", (req, res) => {
  res.send("MovieMate API");
});

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("connected to MongoDB");
    app.listen(8800, () => console.log("backend connected 8800"));
  })
  .catch((err) => {
    console.log(err);
  });

//prevents from crashing after errors
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
