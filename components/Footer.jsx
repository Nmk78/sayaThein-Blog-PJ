"use client"

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import {
  faMagnifyingGlass,
  faHome, faHeart, faHeartCircleCheck, faAdd, 
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const searchBoxTogglerFn = ()=>{
    const div = document.getElementById("searchBox");
    if (div) {
      div.classList.toggle("hidden");
    }
  }
  let user = true;

  return (
    <div className="w-full h-16 flex flex-row justify-around items-center fixed bottom-0 bg-cyan-500 dark:bg-cyan-800 drop-shadow-lg shadow-slate-900">
      <Link href="/" className="flex flex-col items-center m-0"><FontAwesomeIcon icon={faHome} className=" text-sky-900 dark:text-gray-200 w-6" size="2x" /><span className="text-md text-sky-900 dark:text-gray-200 ">Home</span></Link>
      <Link href="/saved" className="flex flex-col items-center m-0"><FontAwesomeIcon icon={faHeart} className=" text-sky-900 dark:text-gray-200 w-6" size="2x" /><span className="text-md text-sky-900 dark:text-gray-200 ">Saved</span></Link>
      <button onClick={searchBoxTogglerFn} className="flex flex-col items-center m-0"><FontAwesomeIcon icon={faMagnifyingGlass} className=" text-sky-900 dark:text-gray-200 w-6" size="2x" /><span className="text-md text-sky-900 dark:text-gray-200 ">Search</span></button>
      <Link href="/posts/create" className="flex flex-col items-center m-0"><FontAwesomeIcon icon={faAdd} className=" text-sky-900 dark:text-gray-200 w-6" size="2x" /><span className="text-md text-sky-900 dark:text-gray-200 ">Create</span></Link>


    </div>
  );
};

export default Footer;
