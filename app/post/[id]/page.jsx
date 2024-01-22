
// 'use client';

import { Metadata } from "next";
import DetailPost from "@components/DetailPost";
import Loading from "@components/Loading";
// import React, { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

// const [post, setPost] = useState({});
let post
export const generateMetadata = () => ({
  title: post.title,
  // title: "Test Title",

  // Add other metadata properties as needed
});

const Posts = () => {

  let id;
  let loading;
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      loading = true;
      try {
        if (typeof window !== "undefined") {
          id = window.location.pathname.split("/").pop();
        }

        console.log(id)
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response)
        if (response.status === 200) {
          const postData = response.data.post;
          // setPost(postData);
          post = postData;
          // setLoading(false);
          loading = false;
        } else {
          console.error("Failed to fetch post");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        // setLoading(false);
        loading = false;
        throw error;
      }
    };

    fetchData();
  // }, []);



  return (
    <>
      {loading && (
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <Loading size="3x" />
          <span className="my-4">Loading post...</span>
        </div>
      )}
      <DetailPost mode="fetch" post={post} />
    </>
  );
};

export default Posts;
