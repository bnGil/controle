import { Router } from "express";

import { getJobs, likeOrUnlikeJob } from "../controllers/jobs.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";

export const jobsRouter = Router();

jobsRouter.get("/", getJobs);
jobsRouter.put("/like", auth, likeOrUnlikeJob);
