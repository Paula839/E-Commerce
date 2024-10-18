import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()
const URL = process.env.MONGODB_URL as string
const client = new MongoClient(URL);
export const database = client.db("ecommerce");

async function connectDB() {
    try {
      await client.connect();
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  }
  
  connectDB();