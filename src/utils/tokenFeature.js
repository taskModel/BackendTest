import jwt from "jsonwebtoken";

export const sendToken = (res, status = 200, message, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  console.log("Token: ", token);

  const isProduction = process.env.NODE_ENV === "production";

  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    })
    .json({
      success: true,
      message,
    });
};

export const clearToken = (res, statusCode, message) => {
  res
    .status(statusCode)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      success: true,
      message,
    });
};
