import { ObjectId } from "mongodb";
import { database } from "../db/database";
import { cart } from "./cartModel";
export interface user {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  addresses?: string[];
  phoneNumber: number;
  imageDir: string;
  cart: cart[];
}

export const buyers = database.collection<user>("buyers");
