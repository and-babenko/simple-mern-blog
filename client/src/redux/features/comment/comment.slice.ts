import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";
import { CommentSliceType, ICommentItem, ICreateCommentData } from "./types";

const initialState: CommentSliceType = {
  comments: [],
  loading: false,
};

// TODO типизация коммента
export const createComment = createAsyncThunk<ICommentItem, ICreateCommentData>(
  "comment/createComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPostComments = createAsyncThunk<any, any>(
  "comment/getComments",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create comment
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, action.payload];
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.loading = false;
    });

    // get comments
    builder.addCase(getPostComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getPostComments.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default commentSlice.reducer;

export const commentsSelector = (state: RootState) => state.comment.comments;
