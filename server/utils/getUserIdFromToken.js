const jwt = require("jsonwebtoken");

const getUserIdFromToken = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_SECURITY_KEY);
  return decoded.id;
};

module.exports = getUserIdFromToken;
