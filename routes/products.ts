import express from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/products";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", verifyAdmin, addProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export { router as products };
