import { Request, RequestHandler, Response } from "express";
import { ObjectId } from "mongodb";
import {
  products,
  product,
  productRequest,
  productUpdateRequest,
} from "../models/productModel";
import { ModifyResult } from "mongodb";
import fs from "fs/promises";
import { ParamsDictionary } from "express-serve-static-core";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await products.find().toArray();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await products.findOne({ _id: new ObjectId(id) });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
};

// Add a new product (Admin only)
export const addProduct = async (
  req: Request<{}, {}, productRequest, {}>,
  res: Response
) => {
  let id: ObjectId = new ObjectId();
  let imageDir: string[] = [];
  if (
    !req.body.name ||
    !req.body.price ||
    !req.body.description ||
    !req.body.category ||
    req.body.quantity === undefined
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    console.log(req.files?.length);
    if (Array.isArray(req.files)) {
      if (!(req.files.length >= 4)) {
        res
          .status(400)
          .json({ message: "you must upload at least six images" });
        return;
      } else {
        let i = 1;
        await fs.mkdir(`images/products/${id}`, { recursive: true });
        for await (const file of req.files) {
          imageDir.push(`images/products/${id}/${i}.jpg`);
          await fs.writeFile(`images/products/${id}/${i}.jpg`, file.buffer);
          i++;
        }
      }
    }
    const newProduct: product = {
      _id: id,
      name: req.body.name.trim(),
      price: Number(req.body.price),
      imageDirs: imageDir,
      description: req.body.description.trim(),
      category: req.body.category.trim(),
      quantity: Number(req.body.quantity),
    };
    await products.insertOne(newProduct);
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

const update = async (
  req: Request<{ id: string }, {}, {}, productUpdateRequest>,
  res: Response
) => {
  if (req.params.id) {
    if (req.params.id.length === 24) {
      if (
        (await products.findOne({
          _id: ObjectId.createFromHexString(req.params.id),
        })) === null
      ) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
    }
    else
    {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (Object.entries(req.query).length !== 0) {
      let prodId = ObjectId.createFromHexString(req.params.id);
      if (req.query.name) {
        console.log(req.query.name);
        products.updateOne({ _id: prodId }, { $set: { name: req.query.name } });
      }
      if (req.query.price) {
        products.updateOne(
          { _id: prodId },
          { $set: { price: Number(req.query.price) } }
        );
      }
      if (req.query.description) {
        products.updateOne(
          { _id: prodId },
          { $set: { description: req.query.description } }
        );
      }
      if (req.query.category) {
        products.updateOne(
          { _id: prodId },
          { $set: { category: req.query.category } }
        );
      }
      if (req.query.quantity) {
        products.updateOne(
          { _id: prodId },
          { $set: { quantity: Number(req.query.quantity) } }
        );
      }
      res.status(200).json({ message: "Product updated successfully" });
      return;
    } else {
      res.status(400).json({ message: "no update params send" });
      return;
    }
  } else {
    res.status(400).json({ message: "no id send" });
    return;
  }
};

export const deleteProduct = async (req: Request<{id:string},{},{}>, res: Response) => {
  const { id } = req.params;
  try {
    if(id.length!==24)
    {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const deletedProduct:product|null = await products.findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
      await fs.rmdir(`images/products/${id}`, { recursive: true });
      return;
    }
    else
    {
      res.status(404).json({ message: "Product not found" });
      return;
    }

  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


export const productController = {
  getAllProducts,
  getProductById,
  addProduct,
  update,
  deleteProduct,
};
