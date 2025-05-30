import express from "express";
import "dotenv/config";
import cors from "cors";
import { authRoutes, userRoutes, chatRoutes } from "./routes/index.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Allow frontend to send cookies
  })
);

const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
  connectDB();
});
