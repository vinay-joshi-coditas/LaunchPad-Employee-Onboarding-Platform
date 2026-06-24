import crypto from "crypto";
import { redis } from "../../connections/redis.connection.js";
import { authResponses } from "./auth.response.js";
import userRepo from "../users/user.repo.js";
import { generateAccessToken, generateRefreshToken } from "../../utilities/jwt.js";
import type { User } from "../users/user.types.js";
import userService from "../users/user.service.js";
import { compare } from "bcryptjs";
import type { UserRole } from "../../utilities/user-role.enum.js";

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

const verifyOTP = async (email: string, otp: string) => {
  try {
    const originalOTP = await redis.get(`OTP:${email}`);

    if (!originalOTP) {
      throw new Error("OTP expired");
    }

    if (otp !== originalOTP) {
      throw authResponses.INVALID_OTP;
    }

    await redis.del(`OTP:${email}`);

    return authResponses.USER_VERIFIED_SUCCESSFULLY!!

  } catch (e) {
    console.log(e);
    throw e;
  }
};



const login = async (credentials: Pick<User, "email" | "password">) => {
  try {
    const user = await userService.find(credentials.email);
    if (!user) throw authResponses.INVALID_CREDENTIALS;
    
    
    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) throw authResponses.INVALID_CREDENTIALS;
    console.log("inside login");

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
    };
    
    const accessToken = generateAccessToken(payload.id, payload.role);
    const refreshToken = generateRefreshToken(payload.id);

    const { password, ...userWithoutPassword } = user.toJSON();
    console.log("USER LOGGED IN");

    return {userWithoutPassword, accessToken, refreshToken };

    
  } catch (error) {
    throw error;
  }
};

export default{
    generateOtp,
    verifyOTP,
    login
}