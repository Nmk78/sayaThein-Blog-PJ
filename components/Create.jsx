'use client'

import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import { usePostContext } from "@app/Contex/postContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
import Loading from "./Loading";
import axios from "axios";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });


const Create = ({ mode, post }) => {
  let token, adminEmail, adminId, adminName, profileImg;

  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
    adminEmail = localStorage.getItem("adminEmail");
    adminName = localStorage.getItem("adminName");
    adminId = localStorage.getItem("adminId");
    profileImg = localStorage.getItem("profileImg");
  }

  const { data: session, status } = useSession();
  const { fetchPosts } = usePostContext();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  let editTags = tags.map((tag) => "#" + tag);
  const redirectTo = mode == "edit" ? `/post/${post._id}` : "/";

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
      ["link"],
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
    "color",
  ];

  const editHandler = () => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setTags(post.tags || []);
    }
  };

  useEffect(() => {
    mode == "edit" ? editHandler() : null;
  }, [mode, post?._id]);

  if (status == "loading") {
    return (
      <>
        <Loading className="absolute top-1/2 left-1/2" size="3x" />
      </>
    );
  }

  if (!token) {
    router.push("/login");
  }

  const handler = async () => {
    if (!token) {
      console.log("Unauthenticated error");
      return;
    }
  
    setEmail(adminEmail);
  
    if (title === "" || content === "") {
      console.log("Content Not Found");
      return;
    }
  
    try {
      setLoading(true);
  
      let API = process.env.NEXT_PUBLIC_API;
  
      let method = mode === "edit" ? "PATCH" : "POST";
      console.log(mode);
  
      const url = mode === "edit" ? `${API}post/${post._id}` : `${API}post/create`;
  
      const response = await axios({
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          title,
          coverImgUrl,
          content,
          author: {
            id: adminId,
            name: adminName,
            email: adminEmail,
            profileImg: profileImg,
          },
          tags,
        },
      });
  
      console.log(response);
  
      if (response.status === 201 || response.status === 200) {
        router.push(redirectTo);
        console.log(redirectTo);
        fetchPosts();
        setTitle("");
        setCoverImgUrl("");
        setContent("");
        setTags([]);
        setLoading(false);
  
        console.log("Successfully created");
      }
    } catch (error) {
      setLoading(false);
      console.error("Fetch error:", error);
    }
  };
  


  // const handler = async () => {
  //   if (!token) {
  //     console.log("Unauthenticated error");
  //     return;
  //   }
  //   setEmail(adminEmail);

  //   if (title == "" || content == "") {
  //     console.log("Content Not Found");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     let API = process.env.NEXT_PUBLIC_API;

  //     let method = mode === "edit" ? "PATCH" : "POST";
  //     console.log(mode);

  //     const response = await axios({
  //       method: method,
  //       url: `${API}/post/${mode === "edit" ? post._id : "create"}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         title,
  //         coverImgUrl,
  //         content,
  //         author: {
  //           id: adminId,
  //           name: adminName,
  //           email: adminEmail,
  //           profileImg: profileImg,
  //         },
  //         tags,
  //       },

  //     });
  //     console.log(response);

  //     if (response.status === 201 || response.status === 200) {
  //       router.push(redirectTo);
  //       console.log(redirectTo);
  //       fetchPosts();
  //       setTitle("");
  //       setCoverImgUrl("");
  //       setContent("");
  //       setTags([]);
  //       setLoading(false);

  //       console.log("Successfully created");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error("Fetch error:", error);
  //   }
  // };

  const tagHandler = (e) => {
    setTags(e.target.value.split("#"));
    console.log(tags);
  };



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

      <div className="flex flex-col items-center justify-start text-4xl text-clip dark:text-cyan-400 text-sky-900 font-latin font-extrabold">
        {mode == "edit" ? "Edit" : "Create a new post"}
      </div>
      <div className="h-[80%] w-full flex flex-col items-center justify-start  ">
        <div
          id="Editor"
          className="bg-gray-300 dark:bg-slate-900 h-full mb-[-5]"
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Write a post..."
            className="h-[80%] whitespace-break-spaces text-xl mx-1 placeholder-gray-600 dark:placeholder-gray-200  text-gray-950  bg-gray-300 dark:text-gray-100 dark:bg-slate-900"
            value={content}
            onChange={(e) => {
              // console.log(e);
              setContent(e);
            }}
          />
        </div>
        <div className="w-full px-1 ">
          <span className="block text-sm font-medium text-white mt-2">
            Title
          </span>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-2 border-2 border-sky-400 dark:border-sky-700 dark:bg-sky-900 bg-sky-100"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="w-full px-1 ">
          <span className="block text-sm font-medium text-white mt-2 ">
            Cover Image
          </span>
          <input
            type="text"
            className="w-full h-10 rounded-lg px-2 border-2 border-sky-400 dark:border-sky-700 dark:bg-sky-900 bg-sky-100"
            placeholder="Cover Image URL"
            required
            value={coverImgUrl}
            onChange={(e) => {
              setCoverImgUrl(e.target.value);
            }}
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
            value={mode == "edit" ? editTags : tags}
            onChange={tagHandler}
          />
        </div>
        <button
          onClick={handler}
          className="rounded-lg bg-gray-500 text-gray-100 text-lg font-semibold dark:bg-cyan-700 px-4 py-1.5 w-fit mt-2 mx-auto"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
