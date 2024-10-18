import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { userTokenAuth } from "../middleware/userTokenAuth";
import { adminTokenAuth } from "../middleware/adminTokenAuth";

export const orderRouter = Router();

orderRouter.post("/api/order/", userTokenAuth, orderController.create);
orderRouter.get("/api/order/admin", adminTokenAuth, orderController.viewAll);
orderRouter.get("/api/order/user", userTokenAuth, orderController.view);
