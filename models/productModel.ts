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

export interface productRequest {
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
}

export interface productUpdateRequest
{
  id:string;
  name?: string;
  price?: number;
  description?: string;
  category?:string;
  quantity?: number;
}
export const products = database.collection<product>("products");
