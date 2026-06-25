import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../utilities/authorize.middleware.js";
import { body } from "../../utilities/validate.js";
import approvalService from "./approval.service.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { ZApprovalCreate } from "./approval.types.js";
import { Route } from "../../routes/routes.types.js";

const router = Router();

router.post(
  "/create",
  authenticate,
  authorize("HR", "Manager"),
  body(ZApprovalCreate),
  async (req, res, next) => {
    try {
      const createdBy = req.user!.id;
      const result = await approvalService.create(req.body, createdBy);
      res.status(201).send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);


export default new Route("/approval", router);