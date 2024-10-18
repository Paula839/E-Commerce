import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { cart } from "./routes/cart";
import { products } from "./routes/products";

dotenv.config()

const URL = process.env.MONGODB_URL as string
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());


//Routes

app.use("/api/cart", cart)
app.use("/api/products", products);



app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});




