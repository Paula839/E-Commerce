import {Router} from "express"
import {cartController} from "../controllers/cart"

export const cartRouter = Router()

cartRouter.post("/", cartController.post).get('/', cartController.get)
cartRouter.delete("/:id", cartController.del)