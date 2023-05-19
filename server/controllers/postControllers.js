import fs from "fs";

import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js";
import { baseUrl } from "../config.js";

export const getAllPosts = async (request, response) => {
  try {
    const postsInstance = await PostModel.find().sort("-createdAt");

    if (!postsInstance) {
      return response.status(204).json({
        message: "No posts",
      });
    }

    response.json(postsInstance);
  } catch (error) {
    console.log("Getting posts error", error);
    return response.status(500).json({
      message: "Getting posts error",
    });
  }
};

export const getPopularPosts = async (request, response) => {
  try {
    const postsNumber = request.params.number;
    const popularPostsInstance = await PostModel.find()
      .limit(postsNumber)
      .sort("-views");

    if (!popularPostsInstance) {
      return response.status(204).json({
        message: "No popular posts",
      });
    }

    response.json(popularPostsInstance);
  } catch (error) {
    console.log("Getting posts error", error);
    return response.status(500).json({
      message: "Getting posts error",
    });
  }
};

export const getOnePost = async (request, response) => {
  try {
    const postId = request.params.id;

    const postInstance = await PostModel.findByIdAndUpdate(
      postId,
      {
        $inc: {
          views: 1,
        },
      },
      {
        returnDocument: "after",
      }
    );

    return response.json(postInstance);
  } catch (error) {
    console.log("Getting post by ID error", error);
    return response.status(404).json({ message: "Getting post by ID error" });
  }
};

export const createPost = async (request, response) => {
  try {
    const { title, text, imgUrl, tags } = request.body;

    const tagsArr = tags ? tags : [];

    const postInstance = new PostModel({
      title,
      text,
      imgUrl,
      tags: tagsArr,
      authorId: request.userId,
    });

    await postInstance.save();

    await UserModel.findOneAndUpdate(request.userId, {
      $push: { posts: postInstance },
    });

    return response.json(postInstance);
  } catch (error) {
    console.log("Post creating error", error);
    return response.status(500).json({
      message: "Post creating error",
    });
  }
};

export const updatePost = async (request, response) => {
  try {
    const { title, text, imgUrl, tags } = request.body;
    const postId = request.params.id;

    const postInstance = await PostModel.findByIdAndUpdate(
      postId,
      {
        title: title,
        text: text,
        imgUrl: imgUrl,
        tags: tags,
      },
      {
        returnDocument: "after",
      }
    );

    return response.json(postInstance);
  } catch (error) {
    console.log("Updating post error", error);
    return response.status(500).json({ message: "Updating post error" });
  }
};

export const removePost = async (request, response) => {
  try {
    const postId = request.params.id;

    const postInstance = await PostModel.findByIdAndDelete(postId);
    if (!postInstance)
      return response.status(404).json({
        message: "Post you trying to delete does not exist",
      });

    const imagePath = postInstance.imgUrl;
    if (imagePath) {
      const replacedPath = imagePath.replace(/http:\/\/localhost:9143\//, "");
      fs.unlinkSync(replacedPath);
    }

    await UserModel.findByIdAndUpdate(request.userId, {
      $pull: {
        posts: postId,
      },
    });

    return response.status(204).json({ message: "Post was deleted" });
  } catch (error) {
    console.log("Removing post error", error);
    return response.status(500).json({ message: "Removing post error" });
  }
};

export const getPostsByUser = async (request, response) => {
  try {
    const userInstance = await UserModel.findById(request.userId);
    const postIds = userInstance.posts.map((post) => post._id);
    const userPosts = await PostModel.find({ _id: { $in: postIds } });

    userPosts[0] ? response.json(userPosts) : response.status(204).json([]);
  } catch (error) {
    console.log("Getting users posts error", error);
    response.status(500).json({ message: "Getting users posts error" });
  }
};

export const uploadImage = (request, response) => {
  try {
    const imagePath = `${baseUrl}uploads/postImages/${request.file.filename}`;
    response.status(200).json(imagePath);
  } catch (error) {
    console.log("Post Image Upload Error", error);
    return response.status(500).json({
      message: "Post Image Upload Error",
    });
  }
};
