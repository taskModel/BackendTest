import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes, userRoutes } from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import { taskRoute } from "./routes/task.js";
import cors from "cors";

export const app = express();

dotenv.config();

//* Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//* Using Route
//? User Route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

//? Task Route
app.use("/api/v1/task", taskRoute);

//* Using Error Middleware
app.use(errorMiddleware);
