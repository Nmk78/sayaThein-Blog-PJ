"use client";

import React, { useState, useEffect } from "react";
import Create from "@components/Create";
import axios from "axios";

const Page = () => {
  // const [post, setPost] = useState({});
  // let id;

  // if (typeof window !== "undefined") {
  //   id = window.location.pathname.split("/").pop();
  // }

  // const fetchPost = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API}posts/${id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("To edit = :", response.data.post);
  //       setPost(response.data.post);
  //     } else {
  //       console.error("Failed to fetch post");
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  // console.log("Post ==> ", post);
  return (
    <>
      <Create mode="edit" />
    </>
  )
};

export default Page;
