'use client'
import React from "react";
import Loading from "./Loading";
import Post from "./Post";
import { usePostContext } from "@app/Contex/postContext";

const SavedPosts = () => {
  let loading = false;
  const { posts } = usePostContext();
  let savedPostsId
  if (typeof localStorage !== "undefined") {
    savedPostsId = JSON.parse(localStorage.getItem("posts")) || [];
  }

  const savedPosts = posts.filter((post) =>
    savedPostsId.some((savedPost) => savedPost._id === post._id)
  );

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center ">
      <Loading size="3x" />
      <span className="my-4">Loading saved posts...</span>
    </div>
    );
  }

  return (
    <div className="flex flex-col md:w-3/4 h-screen items-center mx-auto px-4 pt-5">
      {savedPosts != [] ? (
        savedPosts.reverse().map((savedPost) => {
          return (
            <Post
              mode="saved"
              id={savedPost._id}
              title={savedPost.title}
              author={savedPost.author.name}
              date={savedPost.createdAt}
            />
          );
        })
      ) : (
        <span className="my-4 flex item-center justify-center">
          There is no saved posts.
        </span>
      )}
    </div>
  );
};

export default SavedPosts;
