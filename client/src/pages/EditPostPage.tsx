import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updatePost } from "redux/features/post/post.slice";
import axios from "../utils/axios";

export const EditPostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState<File | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`);
      setTitle(data.title);
      setText(data.text);
      setOldImage(data.imgUrl);
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setOldImage(null);
      setNewImage(evt.target.files[0]);
    }
  };

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      params.id && updatedPost.append("id", params.id);
      newImage && updatedPost.append("image", newImage);

      dispatch(updatePost(updatedPost));

      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setNewImage(null);
  };
  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Update image:
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      <div className="flex object-cover py-2 ">
        {oldImage && (
          <img src={`http://localhost:9143/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Post Header:
        <input
          onChange={(evt) => setTitle(evt.target.value)}
          value={title}
          type="text"
          placeholder="Header..."
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Post text:
        <textarea
          onChange={(evt) => setText(evt.target.value)}
          value={text}
          placeholder="Text..."
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700 resize-none h-40"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={clearFormHandler}
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
        <button
          onClick={submitHandler}
          className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Update Post
        </button>
      </div>
    </form>
  );
};
