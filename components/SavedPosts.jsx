'use client'

import React from "react";
import Loading from "./Loading";
import Post from "./Post";

const SavedPosts = () => {
  let loading = false;

  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center ">
        <Loading size="2x" />
        <span className="my-4">Loading saved posts...</span>
      </div>
    );
  }

  return (
    <>
      <main className="flex flex-col md:w-3/4 h-screen items-center mx-auto ">
        {savedPosts != [] ? (
          savedPosts.reverse().map((savedPost) => {
            console.log(savedPost);
            return <Post mode="saved" id={savedPost._id} title={savedPost.title} author={savedPost.author.name} date={savedPost.createdAt} />;
          })
        ) : (
          <span className="my-4 flex item-center justify-center">There is no saved posts.</span>
        )}
      </main>
    </>
  );
};

export default SavedPosts;
