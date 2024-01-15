"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import SaveBtn from "./SaveBtn";
import ShareButton from "./Sharebutton";
import Link from "next/link";
import GoBack from "./GoBack";
import DOMPurify from "dompurify";
import { formatISO9075 } from "date-fns";
import { useSession } from "next-auth/react";
import DeleteBtn from "./DeleteBtn";
import Loading from "./Loading";
import axios from "axios";

const DetailPost = ({ mode }) => {
  const { data: session, status } = useSession();

  let token, adminId;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
    adminId = localStorage.getItem("adminId");
  }
  // if (mode == "saved") {
  //   let id;

  //   if (typeof window !== "undefined") {
  //     id = window.location.pathname.split("/").pop();
  //   }
  //   console.log("id", id);
  //   const [post, setPost] = useState({});
  //   const [loading, setLoading] = useState({});

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const existingPosts = await JSON.parse(localStorage.getItem("posts"));
  //       const foundPost = await existingPosts.find(
  //         (post) => String(post._id) === id
  //       );
  //       console.log("foundPost", foundPost);
  //       setPost(foundPost);
  //       setLoading(false);
  //     };
  //     if (id != undefined) {
  //       fetchData();
  //     } else {
  //       setTimeout(() => {
  //         fetchData();
  //       }, 500);
  //     }
  //   }, [id]);

  //   const { _id, title, content, author, updatedAt, tags } = post;

  //   const sanitizedContent = DOMPurify.sanitize(content);

  //   return (
  //     <div className="flex flex-col h-full">
  //       <div
  //         id={_id}
  //         className="w-auto md:w-2/3 h-auto bg-gray-300 dark:bg-slate-900 mt-[-11px] flex flex-col items-center justify-between"
  //       >
  //         <Image
  //           src="/images/sample4.jpg"
  //           alt="logo"
  //           width={400}
  //           height={115}
  //           className=" object-contain object-center m-3"
  //         />
  //         <div
  //           id="Content_Area"
  //           className=" w-full h-full px-3 py-2 flex flex-col justify-around"
  //         >
  //           <div
  //             id="upperBanner"
  //             className="w-full h-10 px-4 flex flex-row items-center justify-between"
  //           >
  //             <div className="flex">
  //               <Link href={`/profile/${author?.id}`} className="flex">
  //                 <Image
  //                   src="/images/sample4.jpg"
  //                   alt="profile-image"
  //                   width={40}
  //                   height={40}
  //                   className=" object-contain object-center rounded-full"
  //                 />
  //                 <div className="flex flex-col">
  //                   <div
  //                     id="name"
  //                     className="text-md font-latin font-md ml-5 select-none "
  //                   >
  //                     {author?.name}
  //                   </div>
  //                   <div id="date" className="w-full h-3 flex px-4 text-xs">
  //                     {updatedAt
  //                       ? formatISO9075(new Date(updatedAt), {
  //                           representation: "date",
  //                         })
  //                       : ""}
  //                   </div>
  //                 </div>
  //               </Link>
  //               {status == "authenticated" &&
  //               session?.token.sub == author?.id ? (
  //                 <div id="userDependElement" className="ml-2">
  //                   <Link href={`edit/${_id}`}>
  //                     <FontAwesomeIcon
  //                       className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
  //                       icon={faEdit}
  //                     />
  //                   </Link>
  //                   <DeleteBtn id={_id} />
  //                 </div>
  //               ) : (
  //                 <></>
  //               )}
  //             </div>
  //             <SaveBtn post={post} />
  //           </div>

  //           <div className="font-bold h-10 text-2xl my-2 mb-4 font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
  //             {title}
  //           </div>

  //           <div className="w-full h-auto mb-auto overflow-x-hidden overflow-y-auto whitespace-pre-wrap ">
  //             <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  //           </div>
  //           {/* <div className="flex flex-col">
  //             {tags.map((tag) => (<div className="w-auto h-20 p-2 bg-sky-600 dark:bg-sky-600">{tag}</div>))}
  //           </div> */}
  //           <div
  //             id="button-toolbar"
  //             className="w-full h-10 px-10  flex flex-row items-center justify-between bg-gray-200 dark:bg-gray-500"
  //           >
  //             <GoBack />
  //             <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
  //               <SaveBtn post={post} />
  //             </div>
  //             <div className="w-1/3 h-full flex justify-center items-center cursor-pointer">
  //               <ShareButton />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  //if mode wasn't in edit mode

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    const fetchPost = async () => {
      setLoading(true);
      let id;
      if (typeof window !== "undefined") {
        id = window.location.pathname.split("/").pop();
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const post = response.data;
          setLoading(false);
          // Do something with the posts data
          console.log("Fetched posts:", post);
        } else {
          console.error("Failed to fetch post");
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setPost(response.data.post);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
      console.log(loading);
    };

    fetchPost();
  }, []);

  {
    loading && (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Loading size="3x" />
      </div>
    );
  }

  const { _id, title, coverImgUrl, content, author, updatedAt, tags } = post;

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="flex flex-col items-center h-full">
      <div
        id={_id}
        className="w-full md:w-2/3 h-auto bg-gray-300 dark:bg-slate-900 mt-[-11px] flex flex-col items-center justify-between"
      >
        <div className="w-full h-auto">
          <Image
            src={coverImgUrl}
            alt={title}
            layout="responsive"
            objectFit="cover"
            className="w-full h-auto mt-2 mb-4"
          />
        </div>
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
                  src={author?.profileImg || "/images/sample4.jpg"}
                  alt="profile-image"
                  width={40}
                  height={40}
                  className=" object-contain object-center rounded-full"
                />
                <div className="flex flex-col">
                  <div
                    id="name"
                    className="text-md font-latin font-md ml-5 select-none "
                  >
                    {author?.name}
                  </div>
                  <div id="date" className="w-full h-3 flex px-4 text-xs">
                    {updatedAt
                      ? formatISO9075(new Date(updatedAt), {
                          representation: "date",
                        })
                      : ""}
                  </div>
                </div>
              </Link>
              {token && adminId == author?.id ? (
                <div id="userDependElement" className="ml-2">
                  <Link href={`edit/${_id}`}>
                    <FontAwesomeIcon
                      className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
                      icon={faEdit}
                    />
                  </Link>
                  <DeleteBtn id={_id} />
                </div>
              ) : (
                <></>
              )}
            </div>
            <SaveBtn post={post} />
          </div>

          <div className="font-bold h-10 text-xl my-2 mb-4 font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
            {title}
          </div>

          <div className="w-full h-auto mb-auto overflow-x-hidden overflow-y-auto whitespace-pre-wrap ">
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </div>
          {/* <div className="flex flex-col">
              {tags.map((tag) => (<div className="w-auto h-20 p-2 bg-sky-600 dark:bg-sky-600">{tag}</div>))}
            </div> */}
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
      </div>
    </div>
  );
};

export default DetailPost;
