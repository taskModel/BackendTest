import ErrorHandler from "../middlewares/error.js";
import { taskModel } from "../models/task.js";
import { response } from "../utils/features.js";

//#region All Tasks
export const allTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.find({ user: req.user._id });

    response(res, 200, "All Tasks", tasks);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region Add Tasks
export const addTask = async (req, res, next) => {
  try {
    const title = req.body?.title?.trim().replace(/\s+/g, " ");
    const description = req.body?.description?.trim().replace(/\s+/g, " ");

    if (!title || !description)
      return next(new ErrorHandler("All Fields Required"));

    let task = await taskModel.findOne({ title, user: req.user._id });
    if (task) return next(new ErrorHandler("Task ALready Exist"));

    task = await taskModel.create({
      title,
      description,
      user: req.user._id,
    });

    response(res, 201, "Add Task", task);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region Update Task
export const updateTask = async (req, res, next) => {
  try {
    const title = req.body?.title?.trim().replace(/\s+/g, " ");
    const description = req.body?.description?.trim().replace(/\s+/g, " ");

    if (!title || !description)
      return next(new ErrorHandler("All Fields Required", 400));

    let currTasks = await taskModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!currTasks) return next(new ErrorHandler("Task Not Exist", 404));

    let tasks = await taskModel.findOne({
      title,
      user: req.user._id,
    });

    if (tasks && currTasks._id.toString() !== tasks._id.toString())
      return next(new ErrorHandler("Task Exist Please Add Another Task", 400));

    tasks = await taskModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { returnDocument: "after" }
    );

    response(res, 200, "Ok data ", tasks);
  } catch (error) {
    next(error);
  }
};
//#endregion

//#region isComplete Task

export const isComplete = async (req, res, next) => {
  try {
    let currTasks = await taskModel.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!currTasks) return next(new ErrorHandler("Task Not Exist", 404));

    currTasks.isCompleted = !currTasks.isCompleted;
    await currTasks.save();

    response(res, 200, "Task Status Updated", currTasks);
  } catch (error) {
    next(error);
  }
};

//#endregion

//#region Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    let task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) return next(new ErrorHandler("Task Not Exist", 404));
    response(res, 200, "Task Deleted Successfully!");
  } catch (error) {
    next(error);
  }
};
//#endregion
