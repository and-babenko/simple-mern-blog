import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

import { ILoginData, IFormData, AuthSliceType } from "./types";
import { AxiosError } from "axios";

const initialState: AuthSliceType = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk<ILoginData, IFormData>(
  "auth/registerUser",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        userName,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk<ILoginData, IFormData>(
  "auth/loginUser",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        userName,
        password,
      });

      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/auth/getuser");
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      const { message } = action.payload as { message: string };
      state.isLoading = false;
      state.status = message;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      const { message } = action.payload as { message: string };
      state.isLoading = false;
      state.status = message;
    });

    // getUser, проверка авторизации
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      const { message } = action.payload as { message: string };
      state.isLoading = false;
      state.status = message;
    });
  },
});

export const authSelector = (state: RootState) => state.auth;

export const checkAuthSelector = (state: RootState) =>
  Boolean(state.auth.token);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
