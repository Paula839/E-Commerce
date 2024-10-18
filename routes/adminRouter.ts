import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { adminTokenAuth } from "../middleware/userTokenAuth";
export const adminRouter = Router();

adminRouter.get("/api/admin", adminController.adminLogin);