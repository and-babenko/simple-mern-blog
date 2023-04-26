import path, { dirname } from "path";
import { fileURLToPath } from "url";

import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      // Из-за модульного синтаксиса работа с файлами происходит вот так.
      // Сделали уникальное название.
      // Получили путь к текущей папке.
      // Через функцию mv переместили в Uploads: берем текущий путь - выходим - заходим в аплоадс - перемещаем картинку
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));

      // Отдельно формируем пост с картинкой и без
      const newPostWithImage = new Post({
        userName: user.userName,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      // Чтобы у юзера был этот пост нам надо его запушить (см. схему юзера). Находим юзера и пушим в его массив этот пост. Синтаксис сложный, увы

      await User.findOneAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    // Если пост без картинки:
    const newPostWithoutImage = new Post({
      userName: user.userName,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });
    await newPostWithoutImage.save();
    await User.findOneAndUpdate(req.userId, {
      $push: { posts: newPostWithoutImage },
    });
    return res.json(newPostWithoutImage);
  } catch (error) {
    console.log("Post saving error", error);
    res.json({ message: "Post saving error" });
  }
};

// Новый метод для получения! С сортировкой! И лимитом!
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.json({
        message: "No posts",
      });
    }

    res.json({
      posts,
      popularPosts,
    });
  } catch (err) {
    console.log("Getting posts error", err);
    res.json({ message: "Getting posts error" });
  }
};

export const getById = async (req, res) => {
  try {
    // Способ поиска по айдишнику поста, вытаскиваем из квери!
    const post = await Post.findByIdAndUpdate(req.params.id, {
      // Данным способом мы сначала увеличиваем значение, после чего возвращаем. Классно. Очень удобно так делать счетчики
      $inc: {
        views: 1,
      },
    });
    res.json(post);
  } catch (err) {
    console.log("Getting post by ID error", err);
    res.json({ message: "Getting post by ID errorr" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    // У каждого юзера есть список его постов. Тут мы находим юзера по чекАус и для каждого поста мы ищем в таблице постов.
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => Post.findById(post._id))
    );
    list[0] ? res.json(list) : res.json([]);
  } catch (err) {
    console.log("Getting users posts error", err);
    res.json({ message: "Getting users posts error" });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.json({
        message: "Post you trying to delete does not exist",
      });

    // Удаляем из двух таблиц. Вот так вот например у юзера.
    await User.findByIdAndUpdate(req.userId, {
      $pull: {
        posts: req.params.id,
      },
    });

    res.json({ message: "Post was deleted" });
  } catch (err) {
    console.log("Removing post error", err);
    res.json({ message: "Removing post error" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const post = await Post.findById(id);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
      post.imgUrl = fileName || "";
    }

    post.title = title;
    post.text = text;
    await post.save();

    res.json(post);
  } catch (err) {
    console.log("Updating post error", err);
    res.json({ message: "Updating post error" });
  }
};
