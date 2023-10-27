"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import {
  faMagnifyingGlass,
  faHome,
  faHeart,
  faHeartCircleCheck,
  faAdd,
} from "@fortawesome/free-solid-svg-icons";
import SearchboxToggler from "./SearchboxToggler";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { data: session, status } = useSession();

  let user = true;

  return (
    <footer className="w-full h-16 flex flex-row justify-around items-center fixed bottom-0 bg-cyan-500 dark:bg-cyan-800 drop-shadow-lg shadow-slate-900">
      <Link href="/" className="flex flex-col items-center m-0">
        <FontAwesomeIcon
          icon={faHome}
          className=" text-sky-900 dark:text-gray-200 w-6"
          size="2x"
        />
        <span className="text-md text-sky-900 dark:text-gray-200 ">Home</span>
      </Link>
      <Link href="/saved" className="flex flex-col items-center m-0">
        <FontAwesomeIcon
          icon={faHeart}
          className=" text-sky-900 dark:text-gray-200 w-6"
          size="2x"
        />
        <span className="text-md text-sky-900 dark:text-gray-200 ">Saved</span>
      </Link>
      <div className="flex flex-col items-center m-0">
        <div className="w-10 h-4 items-center">
          <SearchboxToggler size="2x" />
        </div>
        <span className="text-md text-sky-900 dark:text-gray-200 mt-4">
          Search
        </span>
      </div>
      {status === "authenticated" ? (
        <Link href="/posts/create" className="flex flex-col items-center m-0">
          <FontAwesomeIcon
            icon={faAdd}
            className=" text-sky-900 dark:text-gray-200 w-6"
            size="2x"
          />
          <span className="text-md text-sky-900 dark:text-gray-200 ">
            Create
          </span>
        </Link>
      ) : (
        <></>
      )}
      
    </footer>
  );
};

export default Footer;
