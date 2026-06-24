import express from "express";
import { env } from "../validate-env.js";

import { registeredMiddlewares } from "./routes/routes.js";
import { connectToRedis } from "./connections/redis.connection.js";
import { connectToPG } from "./connections/pg.connection.js";


export const startServer = async () => {
  try {
    const app = express();
    await connectToPG();
    await connectToRedis();
    registeredMiddlewares(app);


    const PORT = env.PORT;
    app.listen(PORT, () => {
      console.log(`SERVER STARTED AT PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.nextTick(() => process.exit(1));
  }
};
