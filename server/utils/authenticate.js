const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkJwt = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    // verified token returns user id
    const decoded = jwt.verify(token, process.env.SECRET_SECURITY_KEY);
    // find user's obj in db and assign to req.user
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      errTitle: "Invalid Token",
      desc: "You are not logged in!",
    });
  }
};

module.exports = checkJwt;
