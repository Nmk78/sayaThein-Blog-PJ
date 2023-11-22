'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import SaveBtn from "./SaveBtn";
import ShareButton from "./Sharebutton";
import Link from "next/link";
import GoBack from "./GoBack";
import { usePostContext } from "@app/Contex/postContext";
import DOMPurify from "dompurify";

const DetailPost = ({ mode }) => {



  if (mode == "saved") {
    let id = window.location.pathname.split("/").pop();
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState({})

    useEffect(() => {
      const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
      const foundPost = existingPosts.find((post) => String(post._id) === id);
      console.log("foundPost", foundPost);
      setPost(foundPost);
      setLoading(false);
    }, []);

    
  const { _id, title, content, author, updatedAt } = post;
  console.log("author = ", author);
  console.log("post = ", post);


  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="flex flex-col h-screen">
      <div
        id={_id}
        className="w-auto md:w-2/3 h-full bg-gray-300 dark:bg-slate-900 mt-[-11px] flex flex-col items-center justify-between"
      >
        <Image
          src="/images/sample4.jpg"
          alt="logo"
          width={400}
          height={115}
          className=" object-contain object-center m-3"
        />
        <div
          id="Content_Area"
          className=" w-full h-full px-3 py-2 flex flex-col justify-around"
        >
          <div
            id="upperBanner"
            className="w-full h-10 px-4 flex flex-row items-center justify-between"
          >
            <div className="flex">
              <Link href={`/profile/${author?.id}`} className="flex">
                <Image
                  src="/images/sample4.jpg"
                  alt="profile-image"
                  width={40}
                  height={40}
                  className=" object-contain object-center rounded-full"
                />
                <div
                  id="name"
                  className="text-lg font-latin font-md ml-5 select-none "
                >
                  {author?.name}
                </div>
              </Link>
              <div
                id="userDependElement"
                className={status == "authenticated" ? "ml-2" : "hidden"}
              >
                <Link href={`posts/edit/${_id}`}>
                  <FontAwesomeIcon
                    className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
                    icon={faEdit}
                  />
                </Link>
                <FontAwesomeIcon
                  className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
                  icon={faTrash}
                  onClick={() => {
                    return alert("Deleted this post!");

                    //Delete Code
                  }}
                />
              </div>
            </div>
            <SaveBtn post={post} />
          </div>
          <div id="date" className="w-full h-5 my-2 flex px-4 text-sm">
            {updatedAt}
          </div>
          <div className="font-bold h-10 text-xl my-2 mb-4 font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
            {title}
          </div>

          <div className="w-full h-auto mb-auto overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </div>
      <div
        id="button-toolbar"
        className="w-full h-10 px-10  flex flex-row items-center justify-between bg-gray-200 dark:bg-gray-500"
      >
        <GoBack />
        <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
          <SaveBtn post={post} />
        </div>
        <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
          <ShareButton />
        </div>
      </div>
    </div>
  )
  }

  //if mode was to see detail from regular posts
  const { posts } = usePostContext();
  console.log("posts-", posts);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const id = window.location.pathname.split("/").pop();
      try {
        const res = await fetch(`http://localhost:4000/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        // console.log("Data =",data.post);
        setPost(data.post);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchPosts();
  }, []);
  console.log("Detail post-", post);

  if (!post) {
    return <p>Post not found</p>;
  }
  // let like = true;

  const { _id, title, content, author, updatedAt } = post;

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="flex flex-col h-screen">
      <div
        id={_id}
        className="w-auto md:w-2/3 h-full bg-gray-300 dark:bg-slate-900 mt-[-11px] flex flex-col items-center justify-between"
      >
        <Image
          src="/images/sample4.jpg"
          alt="logo"
          width={400}
          height={115}
          className=" object-contain object-center m-3"
        />
        <div
          id="Content_Area"
          className=" w-full h-full px-3 py-2 flex flex-col justify-around"
        >
          <div
            id="upperBanner"
            className="w-full h-10 px-4 flex flex-row items-center justify-between"
          >
            <div className="flex">
              <Link href={`/profile/${author?.id}`} className="flex">
                <Image
                  src="/images/sample4.jpg"
                  alt="profile-image"
                  width={40}
                  height={40}
                  className=" object-contain object-center rounded-full"
                />
                <div
                  id="name"
                  className="text-lg font-latin font-md ml-5 select-none "
                >
                  {author?.name}
                </div>
              </Link>
              <div
                id="userDependElement"
                className={status == "authenticated" ? "ml-2" : "hidden"}
              >
                <Link href={`posts/edit/${_id}`}>
                  <FontAwesomeIcon
                    className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
                    icon={faEdit}
                  />
                </Link>
                <FontAwesomeIcon
                  className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
                  icon={faTrash}
                  onClick={() => {
                    return alert("Deleted this post!");

                    //Delete Code
                  }}
                />
              </div>
            </div>
            <SaveBtn post={post} />
          </div>
          <div id="date" className="w-full h-5 my-2 flex px-4 text-sm">
            {updatedAt}
          </div>
          <div className="font-bold h-10 text-xl my-2 mb-4 font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
            {title}
          </div>

          <div className="w-full h-auto mb-auto overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
        </div>
      </div>
      <div
        id="button-toolbar"
        className="w-full h-10 px-10  flex flex-row items-center justify-between bg-gray-200 dark:bg-gray-500"
      >
        <GoBack />
        <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
          <SaveBtn post={post} />
        </div>
        <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
          <ShareButton />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
