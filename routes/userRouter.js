import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  uploadAvatar,
} from "../controllers/userControllers.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);
userRouter.get("/current", auth, getCurrentUser);
userRouter.patch("/avatars", auth, upload.single("avatar"), uploadAvatar);

export default userRouter;
