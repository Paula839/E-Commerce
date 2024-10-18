import {Router} from "express"
import {orderController} from "../controllers/orderController"
import { userTokenAuth } from "../middleware/userTokenAuth"
import { adminTokenAuth } from "../middleware/adminTokenAuth"

export const orderRouter = Router()

orderRouter.post("/", userTokenAuth, orderController.create)
orderRouter.get("/admin", adminTokenAuth, orderController.viewAll)
orderRouter.get("/user", userTokenAuth, orderController.view)
