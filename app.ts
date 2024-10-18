import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { cartRouter } from "./routes/CartRouter";
import { userRouter } from "./routes/userRouter";
import { productsRrouter } from "./routes/productsRouter";

dotenv.config()

const URL = process.env.MONGODB_URL as string
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.json());


//Routes

app.use("/api/cart", cartRouter)
app.use("/api/user", userRouter)
app.use("/api/products", productsRrouter)
//

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});




