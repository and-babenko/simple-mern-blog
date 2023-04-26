import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

import { PostsSliceType, IPostItem } from "./types";

const initialState: PostsSliceType = {
  posts: [],
  popularPosts: [],
  loading: false,
};
// TODO Обработка ошибок. Типизация гет-запросов.
// TODO. Проверить типизацию постов

// TODO Управление состоянием загрузки через лоадинг
export const createPost = createAsyncThunk<IPostItem, FormData>(
  "post/createPost",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "post/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/posts/getAll");
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// TODO Types
export const removePost = createAsyncThunk<any, any>(
  "post/removePost",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`, id);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// TODO Types
export const updatePost = createAsyncThunk<any, any>(
  "post/updatePost",
  async (updatedPost, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.id}`, updatedPost);

      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      // const oldPosts = state.posts;
      state.posts = [...state.posts, action.payload];
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
    });

    // Reciving all posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularPosts = action.payload.popularPosts;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
    });

    // Deleting post
    builder.addCase(removePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removePost.fulfilled, (state, action) => {
      state.loading = false;
      // Мы хотим удалить пост по айди (в пейлоаде). Фильтр вернет новый массив у которого нет того айдишника.
      state.posts.filter((post) => post._id !== action.payload._id);
    });
    builder.addCase(removePost.rejected, (state, action) => {
      state.loading = false;
    });

    // Updating post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      // На беке возвращаем обновленный пост. В слайсе мы получаем обновленный пост. Изменяем стейт, обновляя тот единственный пост.
      state.loading = false;
      const index = state.posts.findIndex(
        (post) => post._id === action.payload.id
      );

      state.posts[index] = action.payload;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default postSlice.reducer;

export const postsSelector = (state: RootState) => state.posts.posts;
export const popularPostsSelector = (state: RootState) =>
  state.posts.popularPosts;
