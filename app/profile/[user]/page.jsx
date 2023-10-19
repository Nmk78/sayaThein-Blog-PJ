"use client"

import Profile from "@components/Profile";
import React, { useState } from "react";


const User = ({session}) => {
  
  const [posts, setPosts] = useState([])

console.log("Session = ",session);

  return (
    <>
      <Profile name={session} email={session} posts = {posts}  />
    </>
  );
};

export default User;
