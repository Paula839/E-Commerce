import express from "express";
import { userRouter } from "./routes/userRouter";
import { adminRouter } from "./routes/adminRouter";
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(adminRouter);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




