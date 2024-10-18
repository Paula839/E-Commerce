import {Router} from "express"
import {cartController} from "../controllers/cartController"
import { userTokenAuth } from "../middleware/userTokenAuth"

export const cartRouter = Router()

cartRouter.post("/", userTokenAuth, cartController.post)
cartRouter.get("/", userTokenAuth, cartController.get)
cartRouter.delete("/:id", userTokenAuth, cartController.del)