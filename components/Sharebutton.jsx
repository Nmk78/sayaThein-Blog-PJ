"use client"

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const ShareButton = () => {
  // const router = useRouter();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Your Share Title",
          text: "Check out this awesome page!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      const shareUrl = window.location.href;
      navigator.clipboard.writeText(shareUrl)
      console.log("Fallback share:", shareUrl);

      // You can customize this message
      alert(`Copied: ${shareUrl}`);
    }
  };

  return (
    <FontAwesomeIcon
      className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
      size="2x"
      icon={faShareNodes}
      onClick={handleShare}
    />
  );
};

export default ShareButton;
