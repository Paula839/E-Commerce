import { Router } from "express";
import { userController } from "../controllers/userController";
import multer from "multer";
import { userTokenAuth } from "../middleware/userTokenAuth";
export const userRouter = Router();

userRouter.post("/", multer().single("image"), userController.signup);

userRouter.get("/", userController.signIn);
