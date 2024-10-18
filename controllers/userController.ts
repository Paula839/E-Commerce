import {
  users,
  user,
  userSignUpRequest,
  userLoginRequest,
} from "../models/userModel";
import { RequestHandler, response, Request } from "express";
import fs from "fs/promises";
import { ObjectId } from "mongodb";
import Jwt from "jsonwebtoken";

let secretKey = "azzam2003";
const signup: RequestHandler = async (
  req: Request<{}, {}, userSignUpRequest, {}>,
  res
) => {
  let id: ObjectId = new ObjectId();
  let imageDir: string = ".\\images\\users\\def.jpeg";
  if (!req.body.firstName || !req.body.lastName) {
    res.status(400).send("firstName and lastName are required");
    return;
  } else if (!req.body.email && req.body.email.includes("@")) {
    res.status(400).send("email is required");
    return;
  } else if (await users.findOne({ email: req.body.email })) {
    res.status(400).send("email already exists");
    return;
  } else if (!req.body.password) {
    res.status(400).send("password is required");
    return;
  } else if (!req.body.address) {
    res.status(400).send("addresses are required");
    return;
  } else if (
    !req.body.phoneNumber ||
    isNaN(parseInt(req.body.phoneNumber.trim())) ||
    req.body.phoneNumber.length != 11
  ) {
    res.status(400).send("phoneNumber is required");
    return;
  } else {
    if (!req.file) {
      let imageDir = ".\\images\\users\\def.jpeg";
    } else {
      let imageDir = `images/users/${id}.jpg`;
      await fs.writeFile(imageDir, req.file.buffer);
    }
    let newUser: user = {
      _id: id,
      firstName: req.body.firstName.trim(),
      lastName: req.body.lastName.trim(),
      email: req.body.email.trim(),
      password: req.body.password.trim(),
      address: req.body.address.trim(),
      phoneNumber: req.body.phoneNumber.trim(),
      imageDir: imageDir,
      cart: [],
    };
    await users.insertOne(newUser);
    res.status(200).send("user created");
  }
};

const signIn: RequestHandler = async (
  req: Request<{}, {}, userLoginRequest, {}>,
  res
) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("email and password are required");
  } else {
    let user = await users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      let token = Jwt.sign({ email: user.email, id: user._id }, secretKey, {
        expiresIn: "2d",
        jwtid: new Date().getTime().toString(),
        subject: user._id.toString(),
      });
      res.status(200).send({token: token, userId: user._id});
    } else {
      res.status(400).send("user not found");
    }
  }
};
export const userController = {
  signup,
  signIn,
};
