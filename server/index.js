import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// Constants
dotenv.config();
const PORT = process.env.PORT || 3123;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

//Middlewares
app.use(cors());
app.use(express.json());

// Media
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(
  "/uploads/postImages",
  express.static(path.join(__dirname, "uploads", "postImages"))
);

app.use(
  "/uploads/userAvatars",
  express.static(path.join(__dirname, "uploads", "userAvatars"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

(async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@first-claster.gqijihw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Server start error, ", error);
  }
})();
