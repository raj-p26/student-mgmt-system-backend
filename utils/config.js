const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  DB_NAME: process.env.DB_NAME,
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 8000,
};
