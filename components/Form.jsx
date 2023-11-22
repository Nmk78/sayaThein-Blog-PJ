"use client";

import React, { Children, useState } from "react";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import Loading from "./Loading";
import { useSession } from "next-auth/react";
import { usePostContext } from "@app/Contex/postContext";



const Form = () => {

  const { fetchPosts } = usePostContext();

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const handler = async () => {
    if(status != "authenticated"){
      console.log("Unauthenticated error");
      setEmail(session.user.email)
      return
    }
    if (title== "" || tags == "" || content == "") {
      console.log("Content Not Found");
      return;
    }
    console.log("API",process.env.API);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/post/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            author: {
              id: session.token?.sub,
              name: session.token?.name,
              email: session.token?.email,
            },
            tags,
          }),
        
      });
      console.log(body);
      if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      console.log(res);
    } catch (error) {
      setLoading(false)
      console.error("Fetch error:", error);
    }
    setLoading(false)
    fetchPosts()
    setTitle("")
    setContent("")
    setTags([])
    router.push("/")
    console.log("Successfully created");
  };

  const titleHandler = (e) => {
    // console.log(e.target.value);
    setTitle(e.target.value);
  };

  const contentHandler = (e) => {
    // console.log(e);
    setContent(e);
  };
  const tagHandler = (e) => {
    setTags(e.target.value.split("#"));
    // console.log(tags);
  };

  if(status != "authenticated"){
    router.push("/login")
  }

  return (
    <div
      id="Quill-editor"
      className="w-full h-full flex flex-col justify-evenly bg-gray-400 dark:bg-slate-900"
    >
    
      {loading && (
        <div className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50">
          <Loading size="3x" />
        </div>
      )}
      <div className="h-[80%] flex flex-col items-center justify-start  ">
        <div className="bg-gray-300 dark:bg-slate-900 h-full mb-[-5]">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Write a post..."
            className="h-[80%] text-xl mx-1 placeholder-gray-600 dark:placeholder-gray-200  text-gray-950  bg-gray-300 dark:text-gray-100 dark:bg-slate-900"
            value={content}
            onChange={contentHandler}
          />
        </div>
        <div className="w-full px-1 ">
          <span className="block text-sm font-medium text-white ">Title</span>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-2 border-2 border-sky-400 dark:border-sky-700 dark:bg-sky-900 bg-sky-100"
            placeholder="Title"
            onChange={titleHandler}
          />
        </div>
        <div className="w-full px-1 ">
          <span className="block text-sm font-medium text-white mt-2 ">
            Separate categories by #
          </span>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-2 border-2 border-sky-400 dark:border-sky-700 dark:bg-sky-900 bg-sky-100"
            placeholder="Tags : #vocabulary #grammar "
            onChange={tagHandler}
          />
        </div>
      </div>

      <button
        onClick={handler}
        className="rounded-lg bg-gray-500 text-gray-100 text-lg font-semibold dark:bg-cyan-700 px-4 py-1.5 w-fit mt-2 mx-auto"
      >
        Post
      </button>
    </div>
  );
};

export default Form;
