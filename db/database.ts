import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URL = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(URL);
export const database = client.db("ecommerce");
console.log("database connected");


