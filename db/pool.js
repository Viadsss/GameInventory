const { Pool } = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const connectionUrl = isProduction
  ? process.env.DB_URL_PROD
  : process.env.DB_URL_DEV;

module.exports = new Pool({ connectionString: connectionUrl });
