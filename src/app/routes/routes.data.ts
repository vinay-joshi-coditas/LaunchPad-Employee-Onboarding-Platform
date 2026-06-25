import authRoutes from "../feature-modules/auth/auth.routes.js";
import documentRoutes from "../feature-modules/documents/document.routes.js";
import journeyRoutes from "../feature-modules/onboarding_journey/journey.routes.js";
import taskRoutes from "../feature-modules/tasks/task.routes.js";
import userRoutes from "../feature-modules/users/user.routes.js";
import type { Routes } from "./routes.types.js";

export const routes : Routes = [authRoutes, userRoutes, journeyRoutes, taskRoutes, documentRoutes];