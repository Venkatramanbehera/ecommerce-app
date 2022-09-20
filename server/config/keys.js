require("dotenv").config();

module.exports = {
  mongoURI: process.env.DB_KEY,
  jwtSecret: process.env.SECRET_KEY,
};
