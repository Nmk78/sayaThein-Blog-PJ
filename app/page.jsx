"use client";

import React, { useContext, useState } from "react";

import Post from "@components/Post";
import Loading from "@components/Loading";
import { postContext, usePostContext } from "@app/Contex/postContext";
// import { useSession } from "next-auth/react";
const Home = () => {


  const { posts } = usePostContext();

  

  // const{data: session, status } = useSession();

  if(posts == []){
    // if(status == "loading"){
      return (<div className="w-full h-full flex flex-col items-center justify-center ">
        <Loading size="2x" />
        <span className="my-4">Loading posts...</span>
      </div>)
    }
  return (
    <main className="flex flex-col md:w-2/3 h-screen items-center mx-auto px-4 ">
        <div
          id="hero-text"
          className="flex flex-col w-full mx-10 mt-4 bg-slate-800 dark:bg-slate-900 px-5 py-2 rounded-sm"
        >
          <div className="text-4xl ml-6 font-semibold text-white">Online</div>
          <div className=" m-auto text-7xl text-clip dark:text-cyan-400 text-cyan-500 font-latin font-extrabold ">
            English
          </div>
          <div className="text-3xl mr-6 ml-auto text-yellow-300 font-semibold">
            Guide
          </div>
        </div>

        

        {posts?.map(({_id, title, content, author, date})=>{
          // return <div>{title}</div>
                return <Post key={_id} id={_id} title = {title} author = {author.name} date = {date}/>
        })}

    </main>
  );
};

export default Home;
