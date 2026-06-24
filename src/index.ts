import { config } from "dotenv";

console.log("Server started...");

config();

const appModule = await import ("./app/app.js");

appModule.startServer();