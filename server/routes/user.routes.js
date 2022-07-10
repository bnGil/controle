import { Router } from "express";

import { loginUser } from "../controllers/user.controllers";

export const userRouter = Router();

userRouter.post("/login", loginUser);
