import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  deleteTask,
  addTask,
  allTasks,
  updateTask,
} from "../controllers/task.js";

export const taskRoute = express.Router();

// GET    /api/v1/task
taskRoute.route("/").all(isAuthenticated).get(allTasks).post(addTask);

taskRoute
  .route("/:id")
  .all(isAuthenticated)
  // PUT    /api/v1/task/:id
  .put(updateTask)
  // DELETE  /api/v1/task/:id
  .delete(deleteTask);
