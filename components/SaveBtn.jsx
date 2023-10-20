import { faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SaveBtn = ({ id }) => {
  const [like, setLike] = useState(false);

  return (
    <div className="flex items-center">
      <input
        id="checkbox"
        type="checkbox"
        value={id}
        defaultChecked={false}
        // checked={like ? true : false}
        className="hidden"
      />
      <FontAwesomeIcon
        className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200  cursor-pointer"
        icon={like ? faHeartCircleCheck : faHeart}
        onClick={() => {
            console.log("Saved ID", id);
          setLike(!like);
        }}
      />
    </div>
  );
};

export default SaveBtn;
