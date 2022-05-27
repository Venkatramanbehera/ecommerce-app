const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Dont have any right authorization" });
  }
  try {
    const decode = jwt.verify(token, jwtSecret);
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid Token" });
  }
};
