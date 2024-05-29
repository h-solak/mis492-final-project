const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJwt = require("../utils/authenticate");
const getUserIdFromToken = require("../utils/getUserIdFromToken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate crypted password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      birthday:
        req.body.birthday || "Thu Jan 01 1970 00:00:00 GMT+0200 (GMT+03:00)",
      city: req.body.city || "İstanbul",
      gender: req.body.gender || "female",
    });

    const user = await newUser.save();

    return res.status(200).json({
      data: user?.username,
      desc: "You may login now :)",
    });
  } catch (err) {
    console.log(err?.keyValue?.username);
    return res.status(500).json(err);
  }
});

//LOGIN - username, password
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).send({ desc: "Invalid username or password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //compare the password user sent and the actual one
    !validPassword &&
      res.status(400).json({ desc: "Wrong password, try again *-*" });

    let jwtToken = jwt.sign({ id: user._id }, process.env.SECRET_SECURITY_KEY, {
      expiresIn: "24h",
    });

    // const { password, ...other } = user._doc;
    return res.status(200).json({
      // data: other,
      loggedIn: true,
      jwtToken: jwtToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//get user data (with only jwt)
router.get("/user", checkJwt, async (req, res) => {
  try {
    //getting the user id from user's jwt token
    // const decoded = jwt.verify(
    //   req.headers.authorization,
    //   process.env.SECRET_SECURITY_KEY
    // );
    const id = getUserIdFromToken(req.headers.authorization);

    if (id) {
      const user = await User.findById(id);
      !user && res.status(404).send({ data: {} }); //if the token is not valid

      const { password, ...other } = user._doc; //get the user except password
      return res.status(200).json({
        data: other,
      });
    } else {
      return res.status(500).json();
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
