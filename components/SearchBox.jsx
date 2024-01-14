'use client'

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import SearchResult from "./SearchResult";
import axios from "axios";
const SearchBox = () => {

  const [resultPosts, setResultPosts] = useState([])
  const [searchString, setSearchString] = useState("")

  const searchHandler = async ()=>{
    try {

      const response = await axios.post(process.env.NEXT_PUBLIC_API+"posts/search", {
        search: {
          searchString: searchString,
        },
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200 ) {
        return setResultPosts(response.data.posts);
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
      
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

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
            autoFocus
            value={searchString}
            onChange={(e)=>{setSearchString(e.target.value)}}
            className="w-4/5 h-10 px-4 bg-gray-200 text-gray-700 font-medium text-xl top-10 rounded-l-full focus:outline-none focus:ring-0 "
          />{" "}
          <button className="rounded-r-full bg-gray-300 w-1/5" disabled={!searchString ? true : false} onClick={searchHandler}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className=" text-sky-900 w-5 items-center"
              size="2x"
            />
          </button>
        </div>
        {resultPosts && <div id="searchResult" className="h-auto min-h-10 max-h-72 overflow-scroll">
          <div id="result">
      <SearchResult resultPosts={resultPosts} />
          </div>
        </div>}
      </div>
    </div>
  );
};

export default SearchBox;
