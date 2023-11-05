"use client";

import { createContext, useContext, useState } from "react";


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

  return (
    <postContext.Provider value={{ posts }}>
      {children}
    </postContext.Provider>
  );
};

export const usePostContext = () => {
      return useContext(postContext);
}
