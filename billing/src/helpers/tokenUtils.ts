import dotenv from "dotenv";
import { Response } from "express";

dotenv.config();


export const verifyToken = (req: any, res: Response, next: any) => {
  const token = req.headers.authorization || req.params.token;
  if (!token) {
    res.status(403).json({ status: 403, error: "No token provided" });
  } else {
    if (token === process.env.token) {
      next();
    } else {
      res
        .status(401)
        .json({ status: 401, error: "Unauthorized to access this resource" });
    }
  }
};


