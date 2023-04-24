import path, { dirname } from "path";
import { fileURLToPath } from "url";

import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      // Из-за модульного синтаксиса работа с файлами происходит вот так. dirname /filename не работает
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
    }
  } catch (error) {
    console.log(error);
  }
};
