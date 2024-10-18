import { ObjectId } from "mongodb";
import { database } from "../db/database";
import { cartItem } from "./cartModel";
export interface user {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber: string;
  imageDir: string;
  cart: cartItem[];
}

export interface userSignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber: string;
  imageDir: string;
}

export interface userLoginRequest {
  email: string;
  password: string;
}

export const users = database.collection<user>("users");
