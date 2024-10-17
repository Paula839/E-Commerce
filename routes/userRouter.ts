import { Router } from "express";
import { userController } from "../controllers/userController";
import multer from "multer";
import { adminTokenAuth } from "../middleware/userTokenAuth";
export const userRouter = Router();

userRouter.post("/api/user", multer().single("image"), userController.signup);

userRouter.get("/api/user", userController.signIn);
