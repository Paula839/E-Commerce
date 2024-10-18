import jwt from 'jsonwebtoken';
import { RequestHandler,Request,Response,NextFunction, json } from 'express';

let secretKey = "azzam2003";
export const adminTokenAuth:RequestHandler = (req:Request, res:Response, next) => { 

    if (!req.headers.authorization) {
       res.status(401).send("Access denied. No token provided.");
       return;
    } else {
      const token = req.headers.authorization.split(" ")[1];
      if(token)
      {
        jwt.verify(token,secretKey, (err, decoded) => {
            if(err)
            {
                res.status(401).send("Access denied. Invalid token.");
            }
            else
            {
                next();
            }
        });
      }
    }
}