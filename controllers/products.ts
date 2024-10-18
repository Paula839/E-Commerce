import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { items } from "../models/productModel";
import { ModifyResult } from "mongodb";

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await items.find().toArray();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await items.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

// Add a new product (Admin only)
export const addProduct = async (req: Request, res: Response) => {
  const { name, price, imageDir, description, category, quantity } = req.body;
  if (!name || !price || !description || !category || quantity === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newProduct = await items.insertOne({
      name,
      price,
      imageDir,
      description,
      category,
      quantity,
    });
    res.status(201).json({ message: "Product added successfully", productId: newProduct.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Update an existing product (Admin only)
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, imageDir, description, category, quantity } = req.body;
  if (!name || !price || !description || !category || quantity === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const updatedProduct = await items.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name, price, imageDir, description, category, quantity } },
      { returnDocument: "after" }
    );
    if (!updatedProduct || !updatedProduct.value) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct.value);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProduct = await items.findOneAndDelete({ _id: new ObjectId(id) });
    if (!deletedProduct.value) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};