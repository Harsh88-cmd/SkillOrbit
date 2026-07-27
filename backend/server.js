import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { initSocket } from "./lib/socket.js";   // ← changed

import authRoutes from "./routes/auth.js";
import skillRoutes from "./routes/skill.route.js";
import studentRoutes from "./routes/student.route.js";
import requestRoutes from './routes/Request.route.js';
import sessionRoutes from './routes/session.route.js';
import reviewRoutes from './routes/Review.route.js';
import communityRoutes from './routes/community.route.js';
import commentRoutes from './routes/comment.route.js';
import messageRoutes from './routes/message.route.js';
import like from './routes/like.route.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/students", studentRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/community', commentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/community",like);


const server = initSocket(app);   // ← changed: wrap YOUR app, get back the http server

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(process.env.PORT || 3000, () =>
      console.log(`Server running on port ${process.env.PORT || 3000}`)
    );
  })
  .catch((err) => console.error("MongoDB error:", err));