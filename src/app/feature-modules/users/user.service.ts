import crypto, { hash } from "crypto";
import authService from "../auth/auth.service.js";
import userRepo from "./user.repo.js";
import { UserResponse } from "./user.response.js";
import type { User } from "./user.types.js";
import { redis } from "../../connections/redis.connection.js";
import { sendEmail } from "../../services/email.service.js";
import { hashPassword } from "../../utilities/hash-password.js";

const add = async (user: Omit<User, "id">) => {
  try {
    const otp = await authService.generateOtp(user.email!);

    // await sendEmail(
    //   user.email!,
    //   "Welcome to our platform",
    //   `<h1>LaunchPad will make sure you have a smooth onboarding<br>
    //   Your OTP for login is ${otp}</h1>
    //     <br><br>
    //   <p>Valid for 10 minutes.</p> `,
    // );



    await userRepo.add(user);
    // const isUserVerified = await authService.verifyOTP(email, otp);
    // if(isUserVerified){
    //     await userRepo.add(email, role);

    // }else{
    //     return UserResponse["USER_CAN'T_BE_CREATED"]
    // }
    return UserResponse.USER_CREATED;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

const find = async (email: string) => {
  try {
    const user = await userRepo.findOne(email);
    return user;
  } catch (error) {
    throw error;
  }
};

const findAll = () => userRepo.findAll();

const update = async (id: string, user: Omit<Partial<User>, "id">) => {
  try {
    user.password = await hashPassword(user.password as string);
    user.password_version = 1;
    user.isActive = true;
    user.updatedBy = id;
    await userRepo.update(id, user);
    return UserResponse.USER_UPDATED;
  } catch (error) {
    throw error;
  }
};

export default {
  add,
  find,
  update,
  findAll
};
