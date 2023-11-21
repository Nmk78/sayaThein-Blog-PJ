"use client";

import { faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { set } from "mongoose";
// import { postFinder } from "@lib/postFinder";
import React, { useEffect, useState } from "react";

const SaveBtn = ({ post }) => {
  const [save, setSave] = useState(false);
  // console.log("saved post-" ,post._id);

  if (!post) {
    console.log("just show saved state");

    return (
      <>
        <FontAwesomeIcon
          className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200  cursor-pointer"
          icon={save ? faHeartCircleCheck : faHeart}
        />
      </>
    );
  }
  const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const controlLocalStorage = (post) => {
    console.log("post = ", post);
    const alreadySaved = existingPosts.some(
      (existingPost) => existingPost._id === post._id
    );
    if (alreadySaved) {
      setSave(true);
    }
    if (!save) {
      //Save to local storage
      console.log("Saved ID", post._id);
      existingPosts.push(post);

      localStorage.setItem("posts", JSON.stringify(existingPosts));
    } else {
      console.log("Removed ID", post._id);      
      const updatedPosts = existingPosts.filter(
        (existingPost) => existingPost._id !== post._id
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setSave(false); // Update state if needed
    }
  };

  // useEffect(controlLocalStorage(post),[save]);
  console.log("Save Functionalities Working");
  return (
    <div className="flex items-center">
      <input
        id="checkbox"
        type="checkbox"
        // value={post._id}
        defaultChecked={false}
        // checked={save ? true : false}
        className="hidden"
      />
      <FontAwesomeIcon
        className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200  cursor-pointer"
        icon={save ? faHeartCircleCheck : faHeart}
        onClick={() => {
          setSave(!save);
          controlLocalStorage(post)

        }}
      />
    </div>
  );
};

export default SaveBtn;
