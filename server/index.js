import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import connectToMongo from "./config/db.js";
import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import jobRoutes from "./routes/job.js";
import "./cron/jobCron.js";

connectToMongo();

const app = express();
const port = process.env.SERVER_PORT;

app.use(cookieParser());
app.use(express.json());

import cors from "cors";

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://your-frontend.vercel.app"
//   ],
//   credentials: true
// }));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
    console.log(`JobMatcher listening on port ${port}`);
});