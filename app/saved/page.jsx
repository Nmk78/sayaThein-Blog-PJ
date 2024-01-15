import Loading from "@components/Loading";
import Post from "@components/Post";
import SavedPosts from "@components/SavedPosts";
import React from "react";

const Saved_Posts = () => {

  return (
    <main className="flex flex-col md:w-3/4 h-screen items-center mx-auto ">
      <SavedPosts />
    </main>
  );
};

export default Saved_Posts;
