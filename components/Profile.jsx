"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { signOut , useSession, getProvider } from "next-auth/react";
import Loading from "./Loading";


const Profile = () => {

  // let user;
        const {data: session, status } = useSession();
        const [posts, setPosts] = useState([])

        const fetchAuthorPost = async () => {
          try {
            const res = await fetch(`http://localhost:4000/user/posts/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },body: JSON.stringify({
                author: {
                  id: session.token?.sub,
                  name: session.token?.name,
                  email: session.token?.email,
                },
              }),
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
          fetchAuthorPost();
          console.log(posts);
        }, []);

        if(status == "loading"){
        // if(status == "loading"){
          return (<div className="w-full h-full flex flex-col items-center justify-center ">
            <Loading size="3x" />
            <span className="my-4">Loading Profile...</span>
          </div>)
        }

      return (
    <div>
      <div
        id="Profile"
        className=" w-full h-full flex flex-col items-center mx-auto px-4 py-2"
      >
        <div className="w-full h-36 flex flex-row items-center  bg-cyan-600 dark:bg-slate-900  rounded-xl">
          <Image
            src="/images/sample4.jpg"
            alt="logo"
            width={150}
            height={150}
            className="object-cover rounded-full w-24 h-24 mx-3"
          />
          <div className="mx-2 flex flex-col items-start h-fit content-evenly">
            <div className="text-2xl font-bold text-white dark:text-white-500 mt-4">
              {status == "authenticated" ? session.token?.name : user}
            </div>
            <div className="text-sm font-light text-white dark:text-white-500 mb-3">
              {session?.token?.email}
            </div>
            {status == "authenticated" ? (
              <div id="userAccessOnly" className="flex flex-row items-center ">
                <Link
                  href="/posts/create"
                  className="flex flex-col items-center m-0"
                >
                  <FontAwesomeIcon
                    icon={faAdd}
                    className=" text-gray-200 w-6"
                    size="2x"
                  />
                </Link>
                <button className="bg-sky-900 dark:bg-cyan-800 text-white dark:text-white-500 text-sm px-3 py-2 rounded-full mx-4 text-center"
                onClick={()=>{signOut ({ callbackUrl: '/' })}}
                >
                  Logout
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div id="uploadedPosts" className="w-full px-3">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Profile;
