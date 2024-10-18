import { RequestHandler, Response, Request } from "express";
import { ObjectId } from "mongodb";
import { orders, order } from "../models/orderModel";
import { ModifyResult } from "mongodb";
import { users, user } from "../models/userModel";
import { cartItem } from "../models/cartModel";
import { product, products } from "../models/productModel";

const secretKey = "azzam2003";

const create: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: ObjectId = ObjectId.createFromHexString(req.body.userId);
    const user: user | null = await users.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const cart: cartItem[] = user.cart;

    if (!Array.isArray(cart) || cart.length === 0) {
      res.status(400).json({ message: "Cart is empty" });
      return;
    }

    //Cart -> Order
    //Cart

    if (!user.address) {
      res.status(400).json({ message: "Address is required" });
      return;
    }

    let total: number = 0;
    const orderedItems = await Promise.all(
      cart.map(async (cartItem) => {
        const productItem: product | null = await products.findOne({
          _id: cartItem.item,
        });
        if (!productItem) {
          throw new Error(`Product with ID ${cartItem.item} not found`);
        }
        const itemTotalPrice = productItem.price * cartItem.quantity;
        total += itemTotalPrice;

        return {
          productId: cartItem.item,
          productName: cartItem.name,
          quantity: cartItem.quantity,
          price: productItem.price,
        };
      })
    );

    const id: ObjectId = new ObjectId();
    let newOrder: order = {
      _id: id,
      userId: userId,
      orderedItems,
      date: new Date(),
      status: "proccessing",
      address: user.address,
      total: total,
    };

    await orders.insertOne(newOrder);
    await users.updateOne({ _id: userId }, { $set: { cart: [] } });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to create an order", error });
  }
};

const viewAll: RequestHandler = async (req: Request, res: Response) => {
  try {
    const getAllOrders = await orders.find({}).toArray();
    res.status(200).json({ getAllOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const view: RequestHandler = async (req: Request, res: Response) => {
  try {
    const user: user | null = await users.findOne({
      _id: ObjectId.createFromHexString(req.body.userId),
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const getOrders = await orders
      .find({ userId: ObjectId.createFromHexString(req.body.userId) })
      .toArray();

    res.status(200).json({ getOrders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const orderController = {
  create,
  viewAll,
  view,
};
