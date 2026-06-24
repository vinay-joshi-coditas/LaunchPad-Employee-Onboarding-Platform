import {
  json,
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import helmet from "helmet";
import { routes } from "./routes.data.js";
import { ResponseHandler } from "../utilities/response-handler.js";
import cookieParser from "cookie-parser";

export const registeredMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(json());
  app.use(cookieParser());

  for (const route of routes) {
    app.use(route.path, route.router);
    // console.log(route.path, route.router)
  }
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
