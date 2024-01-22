
// import { Metadata } from "next";
// import DetailPost from "@components/DetailPost";
// import Loading from "@components/Loading";
// import React, { useState } from "react";

// const [post, setPost] = useState({});
// const [loading, setLoading] = useState(false);
// let id;

// const fetchPost = async () => {
//   setLoading(true);
//   if (typeof window !== "undefined") {
//     id = window.location.pathname.split("/").pop();
//   }
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
//       const post = response.data;
//       setLoading(false);
//       // Do something with the posts data
//       console.log("Fetched post detail:", post);
//     } else {
//       console.error("Failed to fetch post");
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     setPost(response.data.post);
//     setLoading(false);
//   } catch (error) {
//     console.error("Fetch error:", error);
//     setLoading(false);
//     throw error;
//   }
//   console.log(loading);
// };

// export const generateMetadata = async () => {
//   const fetchData = async () => {
//     try {
//       const postData = await fetchPost();
//       setPost(postData);
//     } catch (error) {
//       console.error("Error in fetchData:", error);

//       throw error(error);
//     }
//   };
//   fetchData();
//   return {
//     title: post.title,
//   };
// };




// const posts = () => {
//   // useEffect(() => {
//   //   setLoading(true);
//   //   console.log(loading);
//   //   const fetchData = async () => {
//   //     try {
//   //       const postData = await fetchPost();
//   //       setPost(postData);
//   //     } catch (error) {
//   //       console.error("Error in fetchData:", error);

//   //       throw error(error);
//   //     }
//   //   };
//   //   fetchData();
//   // }, [id]);

//   return (
//     <>
//       {loading && (
//         <div className="w-full h-full flex flex-col items-center justify-center ">
//           <Loading size="3x" />
//           <span className="my-4">Loading post...</span>
//         </div>
//       )}
//       <DetailPost mode="fetch" post={post} />;
//     </>
//   );
// };

// export default posts;

'use client';

import { Metadata } from "next";
import DetailPost from "@components/DetailPost";
import Loading from "@components/Loading";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  let id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (typeof window !== "undefined") {
          id = window.location.pathname.split("/").pop();
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const postData = response.data.post;
          setPost(postData);
          setLoading(false);
        } else {
          console.error("Failed to fetch post");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
        throw error;
      }
    };

    fetchData();
  }, []);

  const generateMetadata = () => ({
    title: post.title,
    // title: "Test Title",

    // Add other metadata properties as needed
  });

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
