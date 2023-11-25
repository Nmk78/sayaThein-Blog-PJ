'use client'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteBtn = ({id}) => {

  const router = useRouter()

  const handleDelete = async () => {
    try {

      const response = await fetch(`http://localhost:4000/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedPost = await response.json();
        console.log('Deleted post:', deletedPost);
        router.push("/");
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    handleDelete()
  }, [])
  

  return (
    <>
      <FontAwesomeIcon
        className="w-5 h-5 p-2 ml-2 text-gray-500 dark:text-gray-200 cursor-pointer"
        icon={faTrash}
        onClick={() => {
          if (confirm("Are you sure to delete this article?")) {

          }
          //Delete Code
        }}
      />
    </>
  );
};

export default DeleteBtn;
