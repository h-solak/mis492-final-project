const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const chatRoute = require("./routes/chats");
const movieRoute = require("./routes/movies");

dotenv.config();
//middleware
app.use(express.json()); //body parser
app.use(helmet());
app.use(morgan("common"));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/movies", movieRoute);

// Create GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

mongoose
  .connect(process.env.MONGO_URL, () => {
    console.log("connected to MongoDB");
    app.listen(8800, () => console.log("backend connected 8800"));
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//prevents from crashing after errors
process.on("uncaughtException", function (error) {
  console.log(error.stack);
});
