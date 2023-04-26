import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
// TODO БИБЛИОТЕКА ДЛЯ РАБОТЫ С ДАТОЙ
import Moment from "react-moment";

import { IPostItem } from "../redux/features/post/types";
import { Link } from "react-router-dom";

type postPropsType = {
  post: IPostItem;
};

export const PostItem: React.FC<postPropsType> = ({ post }) => {
  return (
    <Link to={`/${post._id}`} className="flex flex-col basis-1/4 flex-grow">
      <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
        {post.imgUrl && (
          <img
            src={`http://localhost:9143/${post.imgUrl}`}
            alt={post.title}
            className="object-cover w-full"
          />
        )}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-white opacity-50">{post.userName}</div>
        <div className="text-xs text-white opacity-50">
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
      </div>
      <h2 className="text-white text-xl">{post.title}</h2>
      {/* TODO npm i @tailwindcss/line-clamp, плагин и получаем класс для обрезки текста! */}
      <p className="text-white text-xs opacity-40 pt-3 line-clamp-4">
        {post.text}
      </p>
      {/* TODO НОВАЯ ЛИБА ДЛЯ ИКОНОК */}
      <div className="flex gap-3 items-center mt-2">
        <div className="button flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiFillEye /> <span>{post.views}</span>
        </div>
        <div className="button flex items-center justify-center gap-2 text-xs text-white opacity-50">
          <AiOutlineMessage /> <span>{post.comments?.length}</span>
        </div>
      </div>
    </Link>
  );
};
