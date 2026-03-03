import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(404).json({ success: false, message: "Please Login" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
  }
};
