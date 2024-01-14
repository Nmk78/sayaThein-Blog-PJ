'use client'

import React, { useState, useEffect } from "react";
import Create from "@components/create";
import { response } from "express";

const Page = () => {
  const [post, setPost] = useState({});
  let id;

  if (typeof window !== "undefined") {
    id = window.location.pathname.split("/").pop();
  }

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}posts/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const post = response.data;
        // Do something with the posts data
        console.log("Fetched posts:", post);
      } else {
        console.error("Failed to fetch post");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.data.post;
      setPost(data.post);
    } catch (error) {
      console.error("Fetch error:", error);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <Create mode="edit" post={post} />
    </>
  );
};

export default Page;
