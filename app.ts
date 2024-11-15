import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv"
import { cartRouter } from "./routes/CartRouter";
import { userRouter } from "./routes/userRouter";
import { productsRrouter } from "./routes/productsRouter";
import { adminRouter } from "./routes/adminRouter";
import { orderRouter } from "./routes/ordersRouter";
import { createLogger, format, transports } from "winston";
import {Request, Response, NextFunction} from "express"

dotenv.config()
const app = express();
app.use(express.json());

// Configure Winston
const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
    ),
    transports: [
      new transports.Console(), // Log to console
      new transports.File({ filename: "logs/app.log" }) // Log to file
    ]
  });
  
  // Middleware for request logging
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const clientIp = req.ip || req.connection.remoteAddress;
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(
        `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Client IP: ${clientIp}, Duration: ${duration}ms, Headers: ${JSON.stringify(req.headers)}, Query: ${JSON.stringify(req.query)}, Body: ${JSON.stringify(req.body)}`
      );
    });
  
    next();
  });
  

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




