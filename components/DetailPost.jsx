"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEdit,
  faTrash,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import React from "react";
import SaveBtn from "./SaveBtn";
import Link from "next/link";

const DetailPost = () => {
  let user = false;
  let data = {
    id: 1,
    title: "Getting Started with JavaScript",
    content:
      "In this post, we'll explore the basics of JavaScript programming. JavaScript is a versatile programming language that is commonly used for building interactive and dynamic web applications. We'll cover topics such as variables, data types, functions, and control flow. By the end of this post, you'll have a solid foundation in JavaScript to start creating your own web projects In this po st, we'll explore the basics of JavaScript programming. JavaScript is a versatile programming language that is commonly used for building interactive and dynamic web applications. We'll cover topics such as variables, data types, functions, and control flow. By the end of this post, you'll have a solid foundation in JavaScript to start creating your own web projects.",
    author: "John Doe",
    date: "2023-08-01",
  };
  let like = true;

  const { id, title, content, author, date } = data;

  return (
    <div
      id={id}
      className="w-auto md:w-2/3 bg-gray-300 dark:bg-slate-900 mt-[-11px] flex flex-col items-center justify-between"
    >
      <Image
        src="/images/sample4.jpg"
        alt="logo"
        width={400}
        height={115}
        className=" object-contain object-center m-3"
      />{" "}
      <div
        id="Content_Area"
        className=" w-full h-full px-3 py-2 flex flex-col justify-around"
      >
        <div className="w-full h-10 px-4 flex flex-row items-center justify-between">
          <div className="flex">
            <Image
              src="/images/sample4.jpg"
              alt="profile-image"
              width={30}
              height={30}
              className=" object-contain object-center rounded-full"
            />
            <div
              id="name"
              className="text-lg font-latin font-md ml-5 select-none "
            >
              {author}
            </div>
            <div id="userDependElement" className={user ? "ml-2" : "hidden"}>
              <Link href={`posts/edit/${id}`}>
                <FontAwesomeIcon
                  className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200"
                  icon={faEdit}
                />
              </Link>
              <FontAwesomeIcon
                className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200"
                icon={faTrash}
                onClick={() => {
                  return (
                    alert("Deleted this post!")

                    //Delete Code
                  );
                }}
              />
            </div>
          </div>
          <SaveBtn id={id} />
        </div>
        <div className="font-bold text-xl my-2 mb-4 font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
          {title}
        </div>

        <div className="w-auto">{content}</div>
      </div>
    </div>
  );
};

export default DetailPost;
