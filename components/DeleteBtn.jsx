'use client'
import { usePostContext } from "@app/Contex/postContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DeleteBtn = ({ id }) => {
  
let adminId, token;
  if (typeof localStorage !== "undefined") {
    adminId = localStorage.getItem("adminId");
     token = localStorage.getItem("token");
  }

  const { data: session, status } = useSession();
  const { fetchPosts } = usePostContext();

  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          author: {
            id: adminId,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      if (response.status === 200) {
        const deletedPost = response.data;
        console.log("Deleted post:", deletedPost);
        fetchPosts();
        router.push("/");
        return;
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <FontAwesomeIcon
        className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
        icon={faTrash}
        onClick={() => {
          if (confirm("Are you sure to delete this article?")) {
            handleDelete();
          }
        }}
      />
    </>
  );
};

export default DeleteBtn;
