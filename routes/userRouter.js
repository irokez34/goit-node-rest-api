import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);
userRouter.get("/current", auth, getCurrentUser);

export default userRouter;
