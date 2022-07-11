import { Router } from "express";

import { getJobs } from "../controllers/jobs.controllers.js";

export const jobsRouter = Router();

jobsRouter.get("/", getJobs);
