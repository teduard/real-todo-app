function DB() {
  const dotenv = require("dotenv");
  dotenv.config();

  const { Pool } = require("pg");
  const isProduction = process.env.NODE_ENV === "production";

  const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

  const mypool = new Pool({
    connectionString: isProduction
      ? process.env.DATABASE_URL
      : connectionString,
    ssl: {
      rejectUnauthorized: false, //due to Heroku issue
    },
  });

  return mypool;
}

module.exports.DB = DB;
