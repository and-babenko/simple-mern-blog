import React, { useCallback, useEffect, useState } from "react";

import axios from "../utils/axios";
import { PostItem } from "components/PostItem";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {posts.length === 0 ? (
        <div className="text-xl text-center text-white py-10">
          You have no posts
        </div>
      ) : (
        <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
          {posts?.map((post, idx) => (
            <PostItem post={post} key={idx} />
          ))}
        </div>
      )}
    </>
  );
};
