const redis = require("redis");
const dotenv = require("dotenv");

function RedisClient() {
  dotenv.config();

  const config = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PWD,
  };

  const rc = redis.createClient(config);

  rc.on("error", (error) => {
    console.log(error);
  });

  rc.on("connect", () => {
      console.log("connected to redis");
  })

  return rc;
}

module.exports.client = RedisClient();
module.exports.print = redis.print;

//TODO: export wrappers for get/set with auto-connect option