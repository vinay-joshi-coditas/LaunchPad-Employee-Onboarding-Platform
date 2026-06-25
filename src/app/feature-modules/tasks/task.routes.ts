import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../utilities/authorize.middleware.js";
import { body } from "../../utilities/validate.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import taskService from "./task.service.js";
import { ZTaskCreate, ZTaskUpdate, ZTaskStatusUpdate } from "./task.types.js";

const router = Router();

router.post("/create", authenticate, authorize("HR", "Manager"), body(ZTaskCreate), async (req, res, next) => {
    try {
      const createdBy = req.user!.id;
      req.body.assignedBy = req.body.assignedBy ?? createdBy;
      const result = await taskService.create(req.body, createdBy);
      res.status(201).send(new ResponseHandler(result));
    } catch (error) {
      console.log(error);
      
      next(error);
    }
  },
);

router.get(
  "/all",
  authenticate,
  authorize("HR", "Manager"),
  async (req, res, next) => {
    try {
      const result = await taskService.findAll();
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

router.get("/journey/:journeyId", authenticate, async (req, res, next) => {
  try {
    const result = await taskService.findByJourneyId(req.params.journeyId as string);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const result = await taskService.findById(req.params.id as string);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  authenticate,
  authorize("HR", "Manager"),
  body(ZTaskUpdate),
  async (req, res, next) => {
    try {
      const updatedBy = req.user!.id;
      const result = await taskService.update(req.params.id as string, req.body, updatedBy);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

router.patch("/:id/status", authenticate, body(ZTaskStatusUpdate), async (req, res, next) => {
  try {
    const { status } = req.body;
    const updatedBy = req.user!.id;

    // Only HR/Manager can reject tasks
    if (status === "REJECTED" && req.user!.role === "Joinee") {
      return res.status(403).send(new ResponseHandler({ message: "Joinees cannot reject tasks" }));
    }

    const result = await taskService.updateStatus(req.params.id as string, status, updatedBy);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:id",
  authenticate,
  authorize("HR"),
  async (req, res, next) => {
    try {
      const result = await taskService.remove(req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

export default new Route("/task", router);
