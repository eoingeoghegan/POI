import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

/* 
This code works by creating a JWT token for the users including there email and id which lasts 1 hour.
The decodeToken verifies the JWT, retrieves the email and id and returns a decoded object.
It then validates the decoded user and checks the datbase if the user exists.
*/

const result = dotenv.config();

export function createToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, process.env.COOKIE_PASSWORD, options);
}

export function decodeToken(token) {
  const userInfo = {};
  try {
    const decoded = jwt.verify(token, process.env.COOKIE_PASSWORD);
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e) {
    console.log(e.message);
  }
  return userInfo;
}

export async function validate(decoded, request) {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}
