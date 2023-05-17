import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "../utils/axios";
import { IPostItem } from "../redux/features/post/types";
import { authSelector } from "redux/features/auth/auth.slice";
import { removePost } from "redux/features/post/post.slice";
import { toast } from "react-toastify";
import {
  commentsSelector,
  createComment,
  getPostComments,
} from "redux/features/comment/comment.slice";
import { CommentItem } from "components/CommentItem";

export const OnePostPage = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector(authSelector);
  const comments = useSelector(commentsSelector);

  const [post, setPost] = useState<IPostItem | null>(null);
  const [comment, setComment] = useState("");

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setPost(data);
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id));
      toast("Post was deleted");
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const sendCommentHandle = () => {
    try {
      const postId = params.id;

      if (postId) {
        dispatch(
          createComment({
            postId,
            comment,
          })
        );
      }

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Loading...</div>
    );
  }

  return (
    <>
      <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm">
        <Link className="w-full h-full py-2 px-4" to="/">
          Return
        </Link>
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"
              }
            >
              {post.imgUrl && (
                <img
                  src={`http://localhost:9143/${post.imgUrl}`}
                  alt={post.title}
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.userName}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <h2 className="text-white text-xl">{post.title}</h2>
          <p className="text-white text-xs opacity-40 pt-3">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <div className="button flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </div>
              <div className="button flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length}</span>
              </div>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <div className="button flex items-center justify-center gap-2  text-white opacity-50 cursor-pointer">
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </div>
                <div
                  onClick={removePostHandler}
                  className="button flex items-center justify-center gap-2  text-white opacity-50 cursor-pointer"
                >
                  <AiFillDelete />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(evt) => evt.preventDefault()}>
            <input
              type="text"
              placeholder="comment"
              value={comment}
              onChange={(evt) => setComment(evt.target.value)}
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              className="flex justify-center items-center bg-gray-600 text-xs rounded-sm text-white py-2 px-4"
              type="submit"
              onClick={sendCommentHandle}
            >
              Send comment
            </button>
          </form>

          {comments && comments.length > 0 ? (
            comments?.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} />)
          ) : (
            <p className="flex justify-center items-center mt-5 text-xl text-white">
              No comments
            </p>
          )}
        </div>
      </div>
    </>
  );
};
