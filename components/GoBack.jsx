"use client"
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const GoBack = () => {

  const goBack = () => {
      window.history.back();
  };

  return (
    <div className="w-1/3 h-full flex justify-center items-center">
      <FontAwesomeIcon
        className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
        size="2x"
        icon={faArrowLeft}
        onClick={goBack}
      />
    </div>
  );
};

export default GoBack;
