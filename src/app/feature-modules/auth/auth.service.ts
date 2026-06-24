import crypto from "crypto";
import { redis } from "../../connections/redis.connection.js";
import { authResponses } from "./auth.response.js";
import userRepo from "../users/user.repo.js";

const generateOtp = async (email: string) => {
  try {
    const userexists = await userRepo.findOne(email);
    if (!userexists) throw authResponses.USER_NOT_FOUND;
    const otp = crypto.randomInt(100000, 999999).toString();
    const redisKey = `OTP:${userexists.email}`;

    await redis.setEx(redisKey, 600, otp);

    console.log(otp);
    return authResponses.OTP_SENT;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export default {
  generateOtp,
};
