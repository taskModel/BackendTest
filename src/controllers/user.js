import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import { checkEmailFormat, response } from "../utils/features.js";
import { clearToken, sendToken } from "../utils/tokenFeature.js";

//#region All Users
export const allUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    response(res, 200, "All Users List", users);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Details
export const profile = async (req, res, next) => {
  try {
    response(res, 200, "User Data", req.user);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Update
export const updateProfile = async (req, res, next) => {
  try {
    const name = req.body?.name?.trim().replace(/\s+/g, " ");
    const email = req.body?.email?.trim().toLowerCase();

    if (!name || !email)
      return next(new ErrorHandler("All fields required", 400));

    if (!checkEmailFormat(email))
      return next(new ErrorHandler("Invalid email format", 400));

    let user = await userModel.findOne({ email });

    if (user && user._id.toString() !== req.user._id.toString())
      return next(
        new ErrorHandler("Email id Exist Please Use Another Email Id", 400)
      );

    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { returnDocument: "after" }
    );

    response(res, 200, "User Data Update", user);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Delete
export const deleteProfile = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.user._id);
    clearToken(res, 200, "User Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Login
export const login = async (req, res, next) => {
  try {
    if (req.cookies.token)
      return next(new ErrorHandler("You Are Already Login", 400));

    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password?.trim();

    if (!email || !password)
      return next(new ErrorHandler("All fields required", 400));

    if (!checkEmailFormat(email))
      return next(new ErrorHandler("Invalid email format", 400));

    let user = await userModel.findOne({ email }).select("+password");

    if (!user)
      return next(new ErrorHandler("User Not Exist Please Register", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler("Password Invalid", 400));

    sendToken(res, 200, "User Login Successfully !", user);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Register
export const register = async (req, res, next) => {
  try {
    const name = req.body?.name?.trim().replace(/\s+/g, " ");
    const email = req.body?.email?.trim().toLowerCase();
    const password = req.body?.password?.trim();

    if (!name || !email || !password)
      return next(new ErrorHandler("All fields required", 400));

    if (!checkEmailFormat(email))
      return next(new ErrorHandler("Invalid email format", 400));

    if (/\s/.test(password)) {
      return next(new ErrorHandler("Password cannot contain spaces", 400));
    }

    let user = await userModel.findOne({ email });

    if (user) return next(new ErrorHandler("User Exist Please Login", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    sendToken(res, 201, "User Registered Successfully!", user);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region User Logout
export const logout = (req, res) => {
  clearToken(res, 200, "User logout Successfully!");
};
//#endregion
