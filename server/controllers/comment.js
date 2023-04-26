import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment) return res.json({ message: "Comment can not be empty" });

    const newComment = new Comment({ comment });

    await newComment.save();
    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: newComment._id,
      },
    });
    res.json(newComment);
  } catch (error) {
    console.log(error);
    res.json({
      message: "Something went wrong in creating comment",
      error,
    });
  }
};
