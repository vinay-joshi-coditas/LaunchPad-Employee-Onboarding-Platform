import fs from "fs";
import jwt from "jsonwebtoken";
import type { UserRole } from "./user-role.enum.js";

const privateKey = fs.readFileSync("private.key", "utf-8");
const publicKey = fs.readFileSync("public.key", "utf-8");

export type JwtPayloadType = {
  userId: string;
  role: UserRole
};

export const generateAccessToken = (
  userId: string,
  role: JwtPayloadType["role"]
) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "1d",
    }
  );
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, publicKey) as JwtPayloadType;
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};