import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost } from "redux/features/post/post.slice";

export const AddPostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files != null) {
      setImage(evt.target.files[0]);
    }
  };

  const submitHandler = () => {
    try {
      // картинку грузим через формдату
      const formData = new FormData();
      formData.append("title", title);
      formData.append("text", text);
      image && formData.append("image", image);

      dispatch(createPost(formData));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFormHandler = () => {
    setText("");
    setTitle("");
    setImage(null);
  };
  return (
    <form
      className="w-1/3 mx-auto py-10"
      onSubmit={(evt) => evt.preventDefault()}
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Add image:
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      <div className="flex object-cover py-2 ">
        {/* Таким странным образом добавляем картинку. создавая ей временный УРЛ? */}
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
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
          Add Post
        </button>
      </div>
    </form>
  );
};



