"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession, getProvider } from "next-auth/react";
import Loading from "./Loading";
import { fetchData } from "next-auth/client/_utils";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  let token, email, adminId, name, profileImage, refferalCode;

  let id;
  if (typeof window !== "undefined") {
    adminId ? (id = adminId) : (id = window.location.pathname.split("/").pop());
  }
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("token");
    adminId = localStorage.getItem("adminId");
    email = localStorage.getItem("adminEmail");
    name = localStorage.getItem("adminName");
    profileImage = localStorage.getItem("profileImg");
    refferalCode = localStorage.getItem("refferalCode");
  }

  const { data: session, status } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [data, setData] = useState(null);
  const [profileImg, setProfileImg] = useState("");

  const fetchAuthorInfoAndPosts = async () => {

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API + "user/posts/",
        {
          author: {
            id: id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        setData(response.data);
        console.log(user, posts);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      
    }
  };

  const changeProfileImg = async () => {
    let url = prompt("Enter profile image url");
    try {
      console.log("URL", url);
      if (url !== null || url !== "") {
        console.log("RUNNED");
        if (url == "" || url == " " || url === null) {
          alert("Url can't be empty.");
          return;
        }
        const response = await axios
          .patch(process.env.NEXT_PUBLIC_API + "user/profile-img", {
            id: adminId,
            profileImg: url,
          })
          .then((response) => {
            console.log("PATCH request successful:", response.data);
            setProfileImg(url);
            localStorage.setItem("profileImg", url);
            profileImage = response.data.profileImg;
          })
          .catch((error) => {
            console.error("Error in PATCH request:", error.message);
          });
      } else {
        url;
        alert('You clicked "Cancel" or closed the prompt.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = async () => {
    const token = localStorage.removeItem("token");
    const adminId = localStorage.removeItem("adminId");
    const email = localStorage.removeItem("adminEmail");
    const name = localStorage.removeItem("adminName");
    let profileImage = localStorage.removeItem("profileImg");
    const refferalCode = localStorage.removeItem("refferalCode");
    router.push("/");
  };

  useEffect(() => {
    fetchAuthorInfoAndPosts();
  }, []);
  // fetchAuthorInfoAndPosts();
  useEffect(() => {
    console.log("data ==>", data);
    if (data) {
      setProfileImg(user.profileImg);
      setPosts(data.posts);
      setUser(...data.user);
    }
  }, [data?.posts, data?.user]);

  if (status == "loading") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center ">
        <Loading size="3x" />
        <span className="my-4">Loading Profile...</span>
      </div>
    );
  }

  return (
    <div>
      <div
        id="Profile"
        className=" w-full h-full flex flex-col items-center mx-auto px-4 py-2"
      >
        <div className="w-full h-44  flex flex-row items-center  bg-cyan-600 dark:bg-slate-900  rounded-xl">
          {token ? (
            <div
              className=" rounded-full w-28 h-28 mx-3 cursor-pointer"
              onClick={() => {
                changeProfileImg();
              }}
            >
              <img
                src={profileImg || "/images/sample4.jpg"}
                alt="profile image"
                width={160}
                height={160}
                className="object-cover rounded-full w-28 h-28 "
              />
              <p className=" text-[8px] text-center animate-pulse mt-2">
                Change profile Image
              </p>
            </div>
          ) : (
            <div className=" rounded-full w-28 h-28 mx-3">
              <img
                src={profileImg || "/images/sample4.jpg"}
                alt="profile image"
                width={160}
                height={160}
                className="object-cover rounded-full w-28 h-28 "
              />
            </div>
          )}
          <div className="mx-2 flex flex-col items-start h-fit content-evenly">
            <div className="text-2xl font-bold text-white dark:text-white-500 mt-4">
              {token ? name : user?.name}
            </div>
            <div className="text-sm font-light text-white dark:text-white-500 my-3">
              {token ? email : user?.email}
            </div>{" "}
            {token ? (
              <div className="text-sm font-light text-white dark:text-white-500 mb-3">
                Refferal Code - {refferalCode}
              </div>
            ) : (
              ""
            )}
            {token ? (
              <div id="userAccessOnly" className="flex flex-row items-center ">
                <Link
                  href="/post/create"
                  className="flex flex-col items-center m-0"
                >
                  <FontAwesomeIcon
                    icon={faAdd}
                    className=" text-gray-200 w-6"
                    size="2x"
                  />
                </Link>
                <button
                  className="bg-sky-900 dark:bg-cyan-800 text-white dark:text-white-500 text-sm px-2 py-1.5 flex justify-center rounded-xl mx-2 text-center"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </button>
                <button
                  className="bg-sky-900 dark:bg-cyan-800 text-white dark:text-white-500 text-sm px-2 py-1.5 rounded-xl flex justify-center text-center"
                  onClick={fetchAuthorInfoAndPosts}
                >
                  Reload Posts
                </button>
              </div>
            ) : (
              <>
                <button
                  className="bg-sky-900 dark:bg-cyan-800 text-white dark:text-white-500 text-sm px-2 py-1.5 rounded-xl mx-4 flex justify-center text-center"
                  onClick={fetchAuthorInfoAndPosts}
                >
                  Reload Posts
                </button>
              </>
            )}
          </div>
        </div>
        {/* {posts == [] ? <div>No uploaded post</div> : <></>} */}
        <div id="uploadedPosts" className="w-full px-3">
          {posts ? (
            posts
              .reverse()
              .map(({ _id, title, coverImgUrl, author }) => (
                <Post
                  key={_id}
                  id={_id}
                  title={title}
                  author={author.name}
                  coverImgUrl={coverImgUrl}
                />
              ))
          ) : (
            <p>No Post Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
