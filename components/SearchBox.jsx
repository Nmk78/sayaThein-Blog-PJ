"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import SearchResult from "./SearchResult";
const SearchBox = () => {

  const [resultPosts, setResultPosts] = useState([])
  const [searchString, setSearchString] = useState("")

  const searchHandler = async ()=>{
    try {
      const res = await fetch("http://localhost:4000/posts/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({
          search: {
            searchString: searchString
          },
        }),
      });

      if (res.ok) {
        let data = await res.json();
        return setResultPosts(data.posts);
      }
      throw new Error(`HTTP error! Status: ${res.status}`);
      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  console.log(resultPosts);
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
            value={searchString}
            onChange={(e)=>{setSearchString(e.target.value)}}
            className="w-4/5 h-10 px-4 bg-gray-200 text-gray-700 font-medium text-xl top-10 rounded-l-full focus:outline-none focus:ring-0 "
          />{" "}
          <button className="rounded-r-full bg-gray-300 w-1/5" onClick={searchHandler}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className=" text-sky-900 w-5 items-center"
              size="2x"
            />
          </button>
        </div>
        <div id="searchResult" className="h-auto">
          <div id="result">
      <SearchResult resultPosts={resultPosts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
