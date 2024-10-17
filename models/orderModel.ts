import { ObjectId } from "mongodb";
import { database } from "../db/database";
export interface order 
{
  _id: ObjectId;
  userId: ObjectId;
  orderedItems: {
    productId: ObjectId;
    productName: string;
    quantity: number;
    price: number;
  }[];
  date: Date;
  status: "shipping" | "delivered" | "proccessing" | "cancelled" | "confirmed";
  address: string;
  total: number;
}
export const orders = database.collection<order>("orders");
