"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

import Loading from "./Loading";
import axios from "axios";

const Login = ({ mode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "authenticated") {
    router.push("/");
  }

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setRefferalcode] = useState("");
  const [error, setError] = useState("");

  // //1
  // const login = async (e) => {
  //   e.preventDefault();
  //   console.log("Login Fn emit");

  //   try {
  //     const res = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });
  //     if (res.error) {
  //       console.log(error);
  //       setError("\x1b[31m%s\x1b[0m", "Error in submit", error);
  //     }
  //     router.push(res.url || "/");
  //     // router.push('/')
  //   } catch (error) {
  //     console.log(error);
  //     setError("\x1b[31m%s\x1b[0m", "Error in submit", error);
  //   }
  //   return;
  // };


    const login = async (e) => {
      setLoading(true);

      e.preventDefault();
      console.log("Login Fn emit");
              setError("");

      try {

        const res = await axios.post("http://localhost:4000/user/login", {
          email,
          password,
        });
        console.log(res);


        if (res.status == 200) {
          const {_id, name, email, profileImg, refferalCode, token } = res.data;

          console.log("Data = ", _id, name, email, token);
          localStorage.setItem("adminId", _id);
          localStorage.setItem("adminEmail", email);
          localStorage.setItem("adminName", name);
          localStorage.setItem("profileImg", profileImg);
          localStorage.setItem("refferalCode", refferalCode);
          localStorage.setItem("token", token);

          const form = e.target;
          form.reset();
          setEmail("");
          setPassword("");
          setError("");
          router.push(`/profile/${_id}`);
          setLoading(false);

        } else {
          setError("Something went wrong.");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      setLoading(false);
    };

  const register = async (e) => {
    setLoading(true);

    e.preventDefault();
    console.log("Register Fn emit");
    if (!name || !email || !password || !referralCode) {
      setError("Please fill all the fields");
      if (password.length < 8) {
        setError("Password must has at least 8 digits");
      }
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, referralCode }),
      });
      if (res.ok) {
        setLoading(false);

        const form = e.target;
        form.reset();
        setName("");
        setEmail("");
        setPassword("");
        setRefferalcode("");
        setError("");
        router.push("/login");
      } else {
        setError("Something went wrong.");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  // if(loading){
  //   // if(status == "loading"){
  //     return (<div className="w-full h-full flex flex-col items-center justify-center ">
  //     </div>)
  //   }

  return (
    <>
      <div
        id={`${mode}_form`}
        className="w-full h-full flex flex-col justify-center items-center gap-4 p-4 bg-gray-200 dark:bg-slate-800"
      >
        {loading && (
          <div className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50">
            <Loading size="3x" />
          </div>
        )}
        {mode == "register" ? (
          <form onSubmit={register} className="w-full">
            <div className="w-full h-auto pt-5 px-3 pb-4 dark:bg-sky-700 bg-sky-400 rounded-2xl">
              <div className="text-3xl font-bold text-white dark:text-white-500 my-2">
                Register
              </div>
              <span className="block text-sm font-medium text-white">Name</span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border dark:bg-gray-300 border-slate-300 rounded-md text-md dark:text-gray-800 shadow-sm placeholder-slate-400
               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                name="Name"
                id="Name"
                placeholder="Name"
                required
                disabled={loading}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <span className="block text-sm font-medium text-white">
                Email
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border dark:bg-gray-300 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 dark:text-gray-800
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="block text-sm font-medium text-white">
                Password
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-300 border border-slate-300 rounded-md text-md font-semibold shadow-sm placeholder-slate-400 dark:text-gray-800
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                disabled={loading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="block text-sm font-medium text-white">
                Activation Code
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border dark:bg-gray-300 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 dark:text-gray-800
               focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                name="refferal_Code"
                id="referralCode"
                placeholder="Refferal Code"
                required
                disabled={loading}
                onChange={(e) => {
                  setRefferalcode(e.target.value);
                }}
              />
              {error ? (
                <div
                  id="Error"
                  className="flex items-center p-3 my-4 text-md text-red-800  border border-red-300 rounded-lg bg-red-300 dark:bg-red-800 dark:text-red-200 dark:border-red-950"
                  role="Error"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="my-2">
                {" "}
                <span>Already have an acount? </span>{" "}
                <Link href={"/login"} className="underline">
                  Login
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center my-4">
              <button
                type="submit"
                className="dark:bg-sky-700 font-bold bg-sky-400 rounded-xl px-4 py-2"
              >
                Register{" "}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={login} method="POST" className="w-full">
            <div className="w-full h-auto pt-5 px-3 pb-4 dark:bg-sky-700 bg-sky-400 rounded-2xl">
              <div className="text-3xl font-bold text-white dark:text-white-500 my-2">
                Login as Admin{" "}
              </div>

              <span className="block text-sm font-medium text-white">
                Email
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border dark:bg-gray-300 border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 dark:text-gray-800
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                disabled={loading}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="block text-sm font-medium text-white">
                Password
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-300 border border-slate-300 rounded-md text-md font-semibold shadow-sm placeholder-slate-400 dark:text-gray-800
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
             disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             invalid:border-pink-500 invalid:text-pink-600
             focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                disabled={loading}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {error ? (
                <div
                  id="Error"
                  className="flex items-center p-3 my-4 text-md text-red-800  border border-red-300 rounded-lg bg-red-300 dark:bg-red-800 dark:text-red-200 dark:border-red-950"
                  role="Error"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div>
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="my-2">
                <span>Doesn't have account? </span>{" "}
                <Link href={"/register"} className="underline">
                  Register
                </Link>
              </div>
            </div>
            <div className="w-full flex justify-center my-4">
              <button
                type="submit"
                disabled={loading}
                onClick={() => console.log("Loginned")}
                className="dark:bg-sky-700 font-bold bg-sky-400 rounded-xl px-4 py-2"
              >
                Login{" "}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Login;
