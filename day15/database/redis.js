//Redis store /redis-client
//redis client use for connection,store for storing like redux
// 3 packages express-session(mostly redis used for sessions thats why) redis connect-redis

const redis = require("redis");
const connectRedis = require("connect-redis");
const session = require("express-session");

const RedisStore = connectRedis(session);

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
redisClient.on("error", function (err) {
  console.error("could not connect to redis", err);
});
redisClient.on("connect", function () {
  console.log("connected to redis");
});

module.exports = {
  redisClient,
  RedisStore,
  session,
};
