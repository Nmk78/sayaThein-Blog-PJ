"use client";

import {
  faH,
  faHeart,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const Feed = () => {
  const [like, setLike] = useState(false);
  const _id = 123;

  return (
    <Link href={`/posts/${_id}`}>
      {" "}
      <div
        id={_id}
        className="w-full h-36  bg-gray-300 dark:bg-slate-900 my-1 flex flex-row items-center justify-between rounded-2xl"
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
            How to use Voewls in Sentences?
          </div>

          <div className="w-full h-10 flex flex-row items-center justify-around">
            <Image
              src="/images/sample4.jpg"
              alt="profile-image"
              width={30}
              height={30}
              className=" object-contain object-center rounded-full"
            />
            <div id="name" className="text-md font-latin font-md ">
              Wai Yan Thein
            </div>
            <div className="flex items-center">
              <input
                id="checkbox"
                type="checkbox"
                value=""
                defaultChecked={false}
                checked={like ? true : false}
                className="hidden"
              />

              <FontAwesomeIcon
                className="w-5 h-5 ml-2 text-gray-500 dark:text-gray-200"
                icon={like ? faHeartCircleCheck : faHeart}
                onClick={() => {
                  setLike(!like);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
};

export default Feed;