import { ObjectId } from "mongodb";
import { database } from "../db/database";
export interface product {
  _id: ObjectId;
  name: string;
  price: number;
  imageDir: string;
  description: string;
  category: string;
  quantity: number;
}

export const items = database.collection<product>("products");
