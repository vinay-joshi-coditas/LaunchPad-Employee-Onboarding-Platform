import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../../utilities/authorize.middleware.js";
import { body } from "../../utilities/validate.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import { ZOnboardingJourneyCreate, ZOnboardingJourneyUpdate } from "./journey.types.js";
import journeyService from "./journey.service.js";


const router = Router();

router.post( "/create", authenticate, body(ZOnboardingJourneyCreate), authorize("HR"), async (req, res, next) => {
    try {
      const createdBy = req.user!.id;
      console.log("inside journey---------------");
      
      const result = await journeyService.create(req.body.newHireId, createdBy);
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
      const result = await journeyService.findAll();
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await journeyService.findById(id as string);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.get("/hire/:newHireId", authenticate, async (req, res, next) => {
  try {
    const result = await journeyService.findByNewHireId(
      req.params.newHireId as string,
    );
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  authenticate,
  authorize("HR", "Manager"),
  body(ZOnboardingJourneyUpdate),
  async (req, res, next) => {
    try {
      const updatedBy = req.user!.id;
      const result = await journeyService.update(
        req.params.id as string,
        req.body,
        updatedBy,
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:id/complete",
  authenticate,
  authorize("HR", "Manager"),
  async (req, res, next) => {
    try {
      const updatedBy = req.user!.id;
      const result = await journeyService.markCompleted(
        req.params.id as string,
        updatedBy,
      );
      res.send(new ResponseHandler(result));
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", authenticate, authorize("HR"), async (req, res, next) => {
  try {
    const result = await journeyService.remove(req.params.id as string);
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

export default new Route("/journey", router);
