import {Router} from "express"
import {cartController} from "../controllers/cartController"
import { userTokenAuth } from "../middleware/userTokenAuth"

export const cartRouter = Router()

cartRouter.post("/api/cart", userTokenAuth, cartController.post)
cartRouter.get("/api/cart", userTokenAuth, cartController.get)
cartRouter.delete("api/cart/:id", userTokenAuth, cartController.del)