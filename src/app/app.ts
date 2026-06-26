import express from "express";
import http from "http"; 
import { env } from "../validate-env.js";

import { registeredMiddlewares } from "./routes/routes.js";
import { connectToRedis } from "./connections/redis.connection.js";
import { connectToPG } from "./connections/pg.connection.js";
import { initWS } from "./connections/ws.connection.js";


export const startServer = async () => {
  try {
    const app = express();

    registeredMiddlewares(app);

    await connectToPG();
    await connectToRedis();

    const httpServer = http.createServer(app);

    initWS(httpServer);

    const PORT = env.PORT;
    httpServer.listen(PORT, () => {
      console.log(`SERVER STARTED AT PORT ${PORT}`);
    });

  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(1));
  }
};