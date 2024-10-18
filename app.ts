import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { cartRouter } from "./routes/CartRouter";
import { userRouter } from "./routes/userRouter";
import { productsRrouter } from "./routes/productsRouter";
import { adminRouter } from "./routes/adminRouter";
import { orderRouter } from "./routes/ordersRouter";

dotenv.config()
const app = express();
app.use(express.json());
//Routes

app.use(cartRouter)
app.use(userRouter)
app.use(productsRrouter)
app.use(adminRouter)
app.use(orderRouter)
//
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




