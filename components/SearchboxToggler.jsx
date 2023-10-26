import { faClose, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SearchboxToggler = ({ size }) => {
  const [open, setOpen] = useState(true);

  const searchBoxTogglerFn = () => {
    const div = document.getElementById("searchBox");
    if (open) {
      setOpen(false);
      div.classList.remove("hidden"); // Explicitly remove the "hidden" class
    } else {
      setOpen(true);
      div.classList.add("hidden"); // Explicitly add the "hidden" class
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
