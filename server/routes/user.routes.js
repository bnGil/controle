import { Router } from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";

export const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/logout", auth, logoutUser);
