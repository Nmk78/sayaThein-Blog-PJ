"use client";

import { createContext, useContext, useEffect, useState } from "react";


export const postContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([{
    "_id": "65470d6a98ac9f8318d501sb8",
    "title": "Exciting Journey",
    "content": "Embarking on a new adventure, exploring unknown paths. Life is full of surprises and lessons.",
    "author": {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    },
    "tags": ["adventure", "life", "journey"],
    "createdAt": "2023-11-05T12:45:30.123+00:00",
    "updatedAt": "2023-11-05T12:45:30.123+00:00",
    "__v": 0
  },{
    "_id": "65470d6a98ac9f8318d501b8",
    "title": "Exciting Journey",
    "content": "Embarking on a new adventure, exploring unknown paths. Life is full of surprises and lessons.",
    "author": {
      "name": "Jane Doe",
      "email": "jane.doe@example.com"
    },
    "tags": ["adventure", "life", "journey"],
    "createdAt": "2023-11-05T12:45:30.123+00:00",
    "updatedAt": "2023-11-05T12:45:30.123+00:00",
    "__v": 0
  }
  
    ]);

    useEffect(() => {
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
    
      fetchPosts();
    }, []);
    

    // const fetchPosts = async () => {
    //   try {
    //     const res = await fetch("http://localhost:4000/posts/", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     if (!res.ok) {
    //       throw new Error(`HTTP error! Status: ${res.status}`);
    //     }
    //     console.log(res);
    //     // const data = await res.json();
    //     // setPosts(data); // Update posts state
    //   } catch (error) {
    //     console.error("Fetch error:", error);
    //   }
    // }
    

  return (
    <postContext.Provider value={{ posts }}>
      {children}
    </postContext.Provider>
  );
};

export const usePostContext = () => {
      return useContext(postContext);
}
