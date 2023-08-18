import React from "react";
import Feed from "@components/Feed";
const home = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center px-4 ">
      <div
        id="hero-text"
        className="flex flex-col w-full mx-10 bg-slate-800 dark:bg-slate-900 px-5 py-2 rounded-sm"
      >
            <div className="text-4xl ml-6 font-semibold text-white">Online</div>
            <div className=" m-auto text-7xl text-clip dark:text-cyan-400 text-cyan-500 font-latin font-extrabold ">
              English
            </div>
            <div className="text-3xl mr-6 ml-auto text-yellow-300 font-semibold">
              Guide
            </div>
      </div>

      <Feed />
    </div>
  );
};

export default home;
