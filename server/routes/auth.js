const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJwt = require("../utils/authenticate");
const getUserId = require("../utils/getUserId");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate crypted password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(200).json({
      data: user?.username,
      desc: "Welcome aboard " + user?.username + "! You may login now :)",
    });
  } catch (err) {
    console.log(err?.keyValue?.username);
    res.status(500).json(err);
  }
});

//LOGIN - username, password
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username });
    !user && res.status(404).send({ desc: "Invalid username or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //compare the password user sent and the actual one
    !validPassword &&
      res.status(400).json({ desc: "Wrong password, try again *-*" });

    let jwtToken = jwt.sign({ id: user._id }, process.env.SECRET_SECURITY_KEY, {
      expiresIn: "1h",
    });

    const { password, ...other } = user._doc;
    res.status(200).json({
      // data: other,
      desc: "Successfully logged in :)",
      jwtToken: jwtToken,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user data (with only jwt)
router.get("/user", checkJwt, async (req, res) => {
  try {
    const id = getUserId(req.headers.authorization);
    if (id) {
      const user = await User.findOne({ id: id });
      !user && res.status(404).send({ data: {} }); //if the token is not valid

      const { password, ...other } = user._doc;
      res.status(200).json({
        data: other,
      });
    } else {
      res.status(500).json();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
