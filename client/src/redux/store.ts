import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/auth/auth.slice";
import postSlice from "./features/post/post.slice";
import commentSlice from "./features/comment/comment.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    comment: commentSlice,
  },
});
