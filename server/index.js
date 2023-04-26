import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
import commentsRoute from "./routes/comment.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3123;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload()); // Подключаем загрузку картинок!
app.use(express.static("uploads")); // Прописываем путь к картинкам.

// Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);

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
