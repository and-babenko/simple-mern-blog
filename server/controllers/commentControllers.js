import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";

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

export const getCommentsByPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );
    res.json(list);
  } catch (error) {
    console.log("Getting comments error", err);
    res.json({ message: "Getting comments error" });
  }
};
