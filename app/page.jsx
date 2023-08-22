"use client";

import React, { useState } from "react";
import Feed from "@components/Feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCross,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
const home = () => {
  const [open, setOpen] = useState(false);

  const searchBoxTogglerFn = () => {
    const div = document.getElementById("searchBox");
    if (div) {
      div.classList.toggle("hidden");
    }
  };

  let _id = 123

  return (
    <div className="flex flex-col w-full h-screen items-center px-4 ">
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

      <div
        id="searchBox"
        className="absolute top-56 w-80  h-auto dark:bg-sky-700   bg-sky-400 rounded-2xl"
      >
        <div id="closeBtn " className="float-right w-10 z-50">
          <button onClick={searchBoxTogglerFn}>
            <FontAwesomeIcon
              icon={faClose}
              className=" text-sky-900 dark:text-gray-200 w-8 ml-auto float-right"
              size="3x"
            />
          </button>
        </div>
        <div id="searchBar" className="flex flex-row w-full px-5">
          <input
            type="text"
            name="searchBar"
            placeholder="Search...."
            id="searchbar"
            className="w-4/5 h-10 px-4 bg-gray-200 text-gray-700 font-medium text-xl top-10 rounded-l-full focus:outline-none focus:ring-0 "
          />{" "}
          <button className="rounded-r-full bg-gray-300 w-1/5">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className=" text-sky-900 w-5 items-center"
              size="2x"
            />
          </button>
        </div>
        <div id="searchResult" className="h-auto">
          <div id="result">
            <Link href={`/posts/${_id}`}>
              {" "}
              <div
                id={_id}
                className="w-76 h-20 mx-3 bg-sky-600 dark:bg-sky-600 my-1 flex flex-row items-center justify-between rounded-xl"
              >
                <Image
                  src="/images/sample4.jpg"
                  alt="logo"
                  width={65}
                  height={65}
                  className=" object-contain object-center rounded-2xl m-2"
                />{" "}
                <div
                  id="Left"
                  className=" w-full h-full px-3 py-2 flex flex-col justify-around"
                >
                  <div className="font-semibold text-gray-200 text-md text-lg font-latin break-words flex flex-nowrap whitespace-normal overflow-hidden">
                    How to use Voewls in Sentences?
                  </div>

                  <div className="w-full h-10 flex flex-row items-center justify-start">
                    <Image
                      src="/images/sample4.jpg"
                      alt="profile-image"
                      width={30}
                      height={30}
                      className=" object-contain object-center rounded-full"
                    />
                    <div id="name" className="text-md font-latin font-md text-gray-200 ml-3">
                      Wai Yan Thein
                    </div>

                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Feed />
    </div>
  );
};

export default home;
