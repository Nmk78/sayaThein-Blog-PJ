"use client";

import {
  faH,
  faHeart,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

import SaveBtn from "./SaveBtn";
import Link from "next/link";

const Post = ({ id, title, content, author, date }) => {
  //Post Element

  return (
    <Link href={`/posts/${id}`}>
      {" "}
      <div
        id={id}
        className="w-86 md:w-2/3 h-36 md:h-60 bg-gray-300 dark:bg-slate-900 my-1 flex flex-row items-center justify-between rounded-2xl"
      >
        <Image
          src="/images/sample4.jpg"
          alt="logo"
          width={115}
          height={115}
          className=" object-contain object-center rounded-2xl m-3"
        />{" "}
        <div
          id="Left"
          className=" w-full h-full px-3 py-2 flex flex-col justify-around"
        >
          <div className="font-semibold text-md text-xl font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
            {title}
          </div>

          <div className="w-full h-10 flex flex-row items-center justify-around">
              <Image
                src="/images/sample4.jpg"
                alt="profile-image"
                width={30}
                height={30}
                className=" object-contain object-center rounded-full"
              />
              <div id="name" className="text-md font-latin font-sm ">
                {author}
              </div>

            <SaveBtn id={id} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
