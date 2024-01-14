'use client'

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const postContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API + "posts/", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.status === 200) {
        const posts = response.data.posts;
        // Do something with the posts data
        console.log('Fetched posts:', posts);
      } else {
        console.error('Failed to fetch posts');
        throw new Error(`HTTP error! Status: ${response.status}`);

      }


      setPosts(response.data.posts); // Update posts state
      // console.log(data);
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
