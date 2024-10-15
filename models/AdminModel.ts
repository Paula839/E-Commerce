import { ObjectId } from "mongodb";
import { database } from "../db/database";

export interface admin {
  _id: ObjectId;
  userName: string;
  password: string;
}

export const admins = database.collection<admin>("admins");
