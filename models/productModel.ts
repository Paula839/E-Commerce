import { ObjectId } from "mongodb";
import { database } from "../db/database";
export interface product {
  _id: ObjectId;
  name: string;
  price: number;
  imageDirs: string[];
  description: string;
  category: string;
  quantity: number;
}

export const items = database.collection<product>("products");
