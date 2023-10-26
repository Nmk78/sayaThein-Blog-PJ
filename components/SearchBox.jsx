"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faCross,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
const SearchBox = () => {

  

  return (
    <div
      id="searchBox"
      className="absolute top-56 w-full h-auto hidden"
    >
      <div className="w-80 mx-auto py-5 dark:bg-sky-700   bg-sky-400 rounded-2xl">
        <div id="closeBtn " className="float-right w-10 z-50">
        </div>
        <div id="searchBar" className="flex flex-row w-full px-5 py-2">
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
            <Link href={`/posts/123`}>
              {" "}
              <div
                id="123"
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
                    <div
                      id="name"
                      className="text-md font-latin font-md text-gray-200 ml-3"
                    >
                      Wai Yan Thein
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
