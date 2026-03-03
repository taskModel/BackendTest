import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  isCompleted: { type: Boolean, require: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
    select: false,
  },
  createdAt: { type: Date, default: Date.now(), require: true },
});

export const taskModel = mongoose.model("taskModel", taskSchema);
