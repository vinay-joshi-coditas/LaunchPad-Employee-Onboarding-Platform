import authRoutes from "../feature-modules/auth/auth.routes.js";
import userRoutes from "../feature-modules/users/user.routes.js";
import type { Routes } from "./routes.types.js";

export const routes : Routes = [authRoutes, userRoutes];