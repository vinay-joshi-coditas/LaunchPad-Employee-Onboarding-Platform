export const authResponses: Record<
   "USER_NOT_FOUND"
  | "INVALID_CREDENTIALS"
  | "USER_ALREDAY_EXISTS"
  | "INVALID_OTP"
  | "USER_CREATED"
  | "OTP_SENT"
  | "USER_VERIFIED_SUCCESSFULLY",
  { statusCode: number; message: string }
> = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "user not found",
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "invalid credentials ",
  },
  USER_ALREDAY_EXISTS: {
    statusCode: 400,
    message: "user already exists ",
  },
  INVALID_OTP: {
    statusCode: 400,
    message: "invalid OTP",
  },
  USER_CREATED: {
    statusCode: 201,
    message: "user created successfully",
  },
  OTP_SENT: {
    statusCode: 200,
    message: "otp sent successfully",
  },
  USER_VERIFIED_SUCCESSFULLY: {
    statusCode: 200,
    message: "USER VERIFIED SUCCESSFULLY"
  }
};
