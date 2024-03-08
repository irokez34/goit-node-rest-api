import express, { json } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();
const jsonParser = express.json();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", auth, logoutUser);

export default userRouter;
