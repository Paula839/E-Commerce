import express from "express";
import { productController } from "../controllers/productController";
import { adminTokenAuth } from "../middleware/adminTokenAuth";
import multer from "multer";

const productsRrouter = express.Router();

productsRrouter.get("/api/products", productController.getAllProducts);
productsRrouter.get("/api/products/:id", productController.getProductById);
productsRrouter.post(
  "/api/products",
  adminTokenAuth,
  multer().array("images"),
  productController.addProduct
);
productsRrouter.put(
  "/api/products/:id",
  adminTokenAuth,
  productController.update
);
productsRrouter.delete("/api/products/:id", adminTokenAuth, productController.deleteProduct);

export { productsRrouter };
