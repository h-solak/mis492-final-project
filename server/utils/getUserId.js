const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserId = async (token) => {
  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_SECURITY_KEY);
    // find user's obj in db and assign to req.user
    return decoded.id;
  }
  return null;
};

module.exports = getUserId;
