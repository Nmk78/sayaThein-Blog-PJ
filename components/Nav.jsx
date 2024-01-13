"use client";

import React from "react";
import ThemeSwitcher from "../app/themeSwitcher";
import Image from "next/image";
import Link from "next/link";
import {useSession, getProvider } from "next-auth/react";
import { data } from "autoprefixer";

const Nav = () => {
 

  const{data: session, status } = useSession();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("adminId");
  const profileImg = localStorage.getItem("profileImg");

  console.log("Session Status - ",{data: session, status });


  return (
    <nav className="w-full h-16 flex flex-row items-center justify-between fixed top-0 bg-cyan-500 dark:bg-cyan-800 drop-shadow-lg shadow-slate-900 mb-5 z-50">
      <Link href="/" className="flex gap-2 flex-center mx-4">
        <Image
          src="/images/logoRmBg.png"
          alt="logo"
          quality={50}
          priority={false} // {false} | {true}
          width={60}
          height={60}
          className="object-contain"
        />
      </Link>
      <div id="themeSwitcher profile" className="flex flex-row h-full items-center">
        <ThemeSwitcher />
        {
          token ? (
            <Link href={`/profile/${id}`} className="flex gap-2 flex-center mr-4">
              <div>
                {" "}
                <img
                  src={profileImg}
                  alt="Profile image"
                  width={40}
                  height={40}
                  className="object-contain aspect-square rounded-full"
                />
              </div>
            </Link>
            ) : (<></>)
        }
      </div>
    </nav>
  );
};

export default Nav;
