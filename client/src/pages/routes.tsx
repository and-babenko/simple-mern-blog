import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "components/Layout";
import { MainPage } from "./MainPage";
import { PostsPage } from "./PostsPage";
import { OnePostPage } from "./OnePostPage";
import { EditPostPage } from "./EditPostPage";
import { AddPostPage } from "./AddPostPage";
import { RegisterPage } from "./RegisterPage";
import { LoginPage } from "./LoginPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "redux/features/auth/auth.slice";

export const Routing = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path=":id" element={<OnePostPage />} />
          <Route path=":id/edit" element={<EditPostPage />} />
          <Route path="new" element={<AddPostPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
};
