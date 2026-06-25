import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { body } from "../../utilities/validate.js";
import { ZUserCreate } from "./user.types.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../../routes/routes.types.js";
import userService from "./user.service.js";
import { authorize } from "../../utilities/authorize.middleware.js";

const router = Router();

router.post("/add", body(ZUserCreate), authorize("HR"), async(req, res, next) => {
    try {
        const user = req.user;
        req.body.createdBy = user?.id 
        req.body.updatedBy = user?.id

        const result = userService.add(req.body);

        res.send(new ResponseHandler(result));
    } catch (error) {
        console.log(error);
        
        next(error);
    }
})

router.get("/getAll", async(req, res, next) => {
    try {
        const result = userService.findAll();
        res.send(new ResponseHandler(result));
    } catch (error) {
        console.log(error);
        
        next(error);
    }
})

router.patch("/update/:id", async(req, res, next) => {
    try {
        const result = userService.update(req.params.id, req.body);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error);
    }
})


export default new Route("/user", router);