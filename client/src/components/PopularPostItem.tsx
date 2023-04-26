import React from "react";

import { IPostItem } from "../redux/features/post/types";
import { Link } from "react-router-dom";

type PopPostPropsType = {
  post: IPostItem;
};

export const PopularPostItem: React.FC<PopPostPropsType> = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`${post._id}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:bg-gray-white"
      >
        {post.title}
      </Link>
    </div>
  );
};
