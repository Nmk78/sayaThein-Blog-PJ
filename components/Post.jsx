'use client'

import Image from "next/image";
import React, { useState } from "react";
import SaveBtn from "./SaveBtn";
import Link from "next/link";

const Post = ({ id, title, coverImgUrl, author, mode }) => {
  //Post Element
  return (
    <Link
      href={mode == "saved" ? `/saved/${id}` : `/post/${id}`}
      className="w-full flex justify-center items-center"
    >
      {" "}
      <div
        id={id}
        className="w-auto md:w-2/3 h-36 md:h-60 bg-gray-300 dark:bg-slate-900 my-1 flex flex-row items-center justify-start rounded-2xl"
      >
        <Image
          src={coverImgUrl}
          alt={title}
          className="w-32 h-32 ml-2 object-cover rounded-2xl"
        />
        <div
          id="Left"
          className=" w-2/3 h-full px-3 py-2 flex flex-col justify-around"
        >
          <div className="font-semibold text-md text-xl font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
            {title}
          </div>

          <div className="w-full h-10 flex flex-row items-center justify-around">
            <Image
              src={author?.profileImg || "/images/sample4.jpg"}
              alt="profile-image"
              width={30}
              height={30}
              className=" object-cover object-center rounded-full"
            />
            <div id="name" className="text-md font-latin font-sm ">
              {author?.name}
            </div>

            {/* <SaveBtn /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
