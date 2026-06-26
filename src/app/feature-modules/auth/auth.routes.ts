import { Router } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import authService from "./auth.service.js";
import { body } from "../../utilities/validate.js";
import { ZUserLogin } from "./auth.types.js";
import { Route } from "../../routes/routes.types.js";

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

router.post("/verify-otp", async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const result = await authService.verifyOTP(email, otp);
    res.send(new ResponseHandler(result));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/login", body(ZUserLogin), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,      
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.send(new ResponseHandler({user: result.userWithoutPassword}));
  } catch (error) {
    next(error);
  }
});


export default new Route("/auth", router, true);