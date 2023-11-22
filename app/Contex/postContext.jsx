"use client";

import { createContext, useContext, useEffect, useState } from "react";


export const postContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4000/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json(); // Await the promise
      setPosts(data.posts); // Update posts state
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

    useEffect(() => {
      fetchPosts();
    }, []);
    

  return (
    <postContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </postContext.Provider>
  );
};


export const usePostContext = () => {
      return useContext(postContext);
}
