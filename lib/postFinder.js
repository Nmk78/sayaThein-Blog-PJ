import { usePostContext } from "@app/Contex/postContext";
import { useEffect } from "react";

export const postFinder = ({id}) => {
      const { posts } = usePostContext();
      let post;
      useEffect(() => {
            const findPost = async () => {
              try {
                const id = window.location.pathname.split("/").pop();
                const foundPost = posts.find((p) => p._id == id);
                post =foundPost
              } catch (error) {
                console.error("Error finding post:", error);
              }
            };
        
            findPost();
        
            return () => {
              console.log("Post Finder Post ====> ", post);
            };
          }, [posts]);
      
      
      return post;
}