import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import authService from "./auth.service.js";

const router = Router();

router.post("/generateOTP", async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const result = await authService.generateOtp(userEmail);
    res.send(new ResponseHandler(result));
    console.log("Otp generated successfully");
  } catch (error) {
    next(error);
  }
});
