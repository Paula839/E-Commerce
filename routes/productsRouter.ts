import express from "express";
import { getAllProducts, getProductById, addProduct } from "../controllers/productController";
import { userTokenAuth } from "../middleware/userTokenAuth"
import multer from "multer";

const productsRrouter = express.Router();

productsRrouter.get("/", userTokenAuth, getAllProducts);
productsRrouter.get("/:id", userTokenAuth, getProductById);
productsRrouter.post("/", userTokenAuth, addProduct);
router.put("/:id", userTokenAuth, multer.Array("images"),);
router.delete("/:id", userTokenAuth, multer.Array("images"),);

export { productsRrouter };
