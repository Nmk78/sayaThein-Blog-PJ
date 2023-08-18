import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faMagnifyingGlass,
  faHome, faHeart, faHeartCircleCheck
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="w-full h-20 flex flex-row justify-around items-center bg-cyan-500 dark:bg-cyan-800 drop-shadow-lg shadow-slate-900">
      <div className="flex flex-col items-center m-0"><FontAwesomeIcon icon={faHome} className=" text-sky-900 dark:text-sky-500 w-6" size="2x" /><span className="text-md text-sky-900 dark:text-sky-500 ">Home</span></div>
      <div ><FontAwesomeIcon icon={faHeart} className=" text-sky-900 dark:text-sky-500 w-6" size="2x" />Save</div>
      <div ><FontAwesomeIcon icon={faMagnifyingGlass} className=" text-sky-900 dark:text-sky-500 w-6" size="2x" />Search</div>


    </div>
  );
};

export default Footer;
