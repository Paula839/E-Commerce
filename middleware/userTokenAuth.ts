import jwt from "jsonwebtoken";
import { RequestHandler, Request, Response, NextFunction, json } from "express";

let secretKey = "azzam2003";
export const userTokenAuth: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  if (!req.headers.authorization) {
    res.status(401).send("Access denied. No token provided.");
    return;
  } else {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).send("Access denied. Invalid token.");
        } else {
          let id: { id: string } = JSON.parse(JSON.stringify(decoded));
          req.body.userId = id.id;
          next();
        }
      });
    }
  }
};
