import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, select: false },
  createdAt: { type: Date, default: Date.now(), require: true },
});

export const userModel = mongoose.model("userModel", userSchema);
