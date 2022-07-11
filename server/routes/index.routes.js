import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { jobsRouter } from "./jobs.routes.js";

export const indexRouter = Router();

indexRouter.use("/user", userRouter);
indexRouter.use("/jobs", jobsRouter);
