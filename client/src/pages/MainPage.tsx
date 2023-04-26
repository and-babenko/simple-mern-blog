import React, { useEffect } from "react";
import { PostItem } from "components/PostItem";
import { PopularPostItem } from "components/PopularPostItem";
import { useDispatch, useSelector } from "react-redux";
import {
  postsSelector,
  popularPostsSelector,
  getAllPosts,
} from "redux/features/post/post.slice";

export const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(postsSelector);
  const popularPosts = useSelector(popularPostsSelector);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Posts doesn't exist
      </div>
    );
  }
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <h2 className="text-xs text-white uppercase">Popular posts</h2>
          {popularPosts?.map((popPost, index) => (
            <PopularPostItem key={index} post={popPost} />
          ))}
        </div>
      </div>
    </div>
  );
};
