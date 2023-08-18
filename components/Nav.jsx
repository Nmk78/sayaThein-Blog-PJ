"use client";

import React from "react";
import ThemeSwitcher from "../app/themeSwitcher";
import Image from "next/image";
import Link from "next/link";
import { sigIn, sigOut, useSession, getProvider } from "next-auth/react";

const Nav = () => {
  let user = true;

  return (
    <div className="w-full h-16 flex flex-row items-center justify-between bg-cyan-500 dark:bg-cyan-800 drop-shadow-lg shadow-slate-900 mb-5">
      <Link href="/" className="flex gap-2 flex-center mx-4">
        <Image
          src="/images/logoRmBg.png"
          alt="logo"
          width={60}
          height={60}
          className="object-contain"
        />
      </Link>
      <div className="flex flex-row h-full items-center">
        <ThemeSwitcher />
        {
          user ? (
            <Link href="/" className="flex gap-2 flex-center mr-4">
              <div>
                {" "}
                <Image
                  src="/images/logoRmBg.png"
                  alt="logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            </Link>
            ) : (<></>)
        }
      </div>
    </div>
  );
};

export default Nav;
