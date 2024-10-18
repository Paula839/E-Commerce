import { admin,admins } from "../models/AdminModel";
import { RequestHandler, Response, Request } from "express";
import Jwt from "jsonwebtoken";
let secretKey = "azzam2003";
export const adminLogin: RequestHandler = async(req: Request<{},{},admin>, res:Response) => {
    try{
    const admin:admin|null = await admins.findOne({ userName: req.body.userName, password: req.body.password });
    if(admin)
    {
        const token = Jwt.sign({ userName: admin.userName},secretKey,{
            expiresIn: "2d",
        });
        res.send({ token: token });
    }
    else
    {
        res.send("admin not found");
    }
    }
    catch(err)
    {
        res.send("internal server error in admin controller");
    }
}

export const adminController = {
    adminLogin
}