export const authResponses: Record<
   "USER_NOT_FOUND"
  | "INVALID_CREDENTIALS"
  | "USER_ALREDAY_EXISTS"
  | "INVALID_OTP"
  | "USER_CREATED"
  | "OTP_SENT",
  { statusCode: number; messege: string }
> = {
  USER_NOT_FOUND: {
    statusCode: 404,
    messege: "user not found",
  },
  INVALID_CREDENTIALS: {
    statusCode: 401,
    messege: "invalid credentials ",
  },
  USER_ALREDAY_EXISTS: {
    statusCode: 400,
    messege: "user already exists ",
  },
  INVALID_OTP: {
    statusCode: 400,
    messege: "invalid OTP",
  },
  USER_CREATED: {
    statusCode: 201,
    messege: "user created successfully",
  },
  OTP_SENT: {
    statusCode: 200,
    messege: "otp sent successfully",
  },
};
