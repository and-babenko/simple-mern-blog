import React from "react";

import { ICommentItem } from "../redux/features/comment/types";

type CommentItemType = {
  cmt: ICommentItem;
};

export const CommentItem: React.FC<CommentItemType> = ({ cmt }) => {
  const initials = cmt.comment.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm">
        {initials}
      </div>
      <p className="text-gray-300 flex text-[10px] overflow-auto">
        {cmt.comment}
      </p>
    </div>
  );
};
