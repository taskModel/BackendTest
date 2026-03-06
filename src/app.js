import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRoutes, userRoutes } from "./routes/user.js";
import { errorMiddleware } from "./middlewares/error.js";
import { taskRoute } from "./routes/task.js";
import cors from "cors";

export const app = express();

dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app",
];

//* Using Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//* Using Route
//? User Route
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

//? Task Route
app.use("/api/v1/task", taskRoute);

//* Using Error Middleware
app.use(errorMiddleware);
