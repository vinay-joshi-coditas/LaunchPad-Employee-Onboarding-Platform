import { createClient } from "redis";

export const redis = createClient();
export const connectToRedis = async () => {
  try {
    await redis.connect();
    redis.on("error", (err) => {
      console.log("error connecting to redis..");
    });
    console.log("Connected to Redis successfully");
  } catch (error) {
    throw error;
  }
};
