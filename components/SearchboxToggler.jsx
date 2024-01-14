import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SearchboxToggler = ({ size }) => {
  const [open, setOpen] = useState(true);

  const searchBoxTogglerFn = () => {
    if (typeof window !== undefined) {
      const div = document.getElementById("searchBox");
  
      if (div) {
        if (open) {
          setOpen(false);
          div.classList.remove("hidden");
        } else {
          setOpen(true);
          div.classList.add("hidden");
        }
      } else {
        console.error("Element with id 'searchBox' not found");
      }
    }
  };
  

  return (
    <button onClick={() => searchBoxTogglerFn()}>
      <FontAwesomeIcon
        icon={!open ? faClose : faMagnifyingGlass}
        className="text-sky-900 dark:text-gray-200 w-8 ml-auto float-right"
        size={size}
      />
    </button>
  );
};

export default SearchboxToggler;
