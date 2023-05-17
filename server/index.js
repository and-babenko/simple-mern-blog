import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";
import multer from "multer";

import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
dotenv.config();

// Uploads
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Constants
const PORT = process.env.PORT || 3123;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

//Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Мы ожидаем свойство image с картинкой. КЕЕЕЕК ТУТ МОЖНО ВМЕСТО ОБЪЕКТА ПРОПИСЫВАТЬ СРАЗУ ММЕТОД ЗАПРОСА
app.post("/api/uploads", upload.single("image"), (request, response) => {
  // Используя этот миддлвэир мы сохраняем в реквест.файл инфа про загружаемую картинку, а возврвщаем мы ему урл.
  // Добавить чекАус
  // Отправляем запрос на этот адрес апи-аплоад, мульипартформдата, поле image, значение картинка.

  response.json({
    url: `/uploads/${request.file.originalname}`,
  });
});

// Если мы не пропишем эту фигню то при попытке вбить адрес картинки у нас экспресс попробует отправить обычный гет запрос вместо попытки найти в папке картинку.
app.use("api/uploads", express.static("uploads"));

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

/*

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

fs.unlinkSyns(path) - удалить файл.
*/
