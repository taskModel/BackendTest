import express from "express";
import {
  allUsers,
  logout,
  login,
  updateProfile,
  deleteProfile,
  register,
  profile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const userRoutes = express.Router();
export const authRoutes = express.Router();

// GET    /api/v1/users
userRoutes.get("/", isAuthenticated, allUsers);

userRoutes
  .route("/me")
  .all(isAuthenticated)
  // GET    /api/v1/users/me
  .get(profile)
  // PUT    /api/v1/users/me
  .put(updateProfile)
  // DELETE /api/v1/users/me
  .delete(deleteProfile);

// POST   /api/v1/auth/register
authRoutes.post("/register", register);
// POST   /api/v1/auth/login
authRoutes.post("/login", login);
// POST   /api/v1/auth/logout
authRoutes.post("/logout", isAuthenticated, logout);
