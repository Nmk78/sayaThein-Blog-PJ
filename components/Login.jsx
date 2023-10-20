import React from "react";

const Login = ({mode}) => {
  
  return (
    <>
      <div
        id={`${mode}_form`}
        className="w-full h-full flex flex-col justify-center items-center gap-4 p-4 bg-gray-200 dark:bg-slate-800"
      >
        <div className="w-full h-auto pt-5 px-3 pb-3 dark:bg-sky-700 bg-sky-400 rounded-2xl">
          <div className="text-2xl font-bold text-white dark:text-white-500 my-2">
            Login as Admin
          </div>
          <span classname="block text-sm font-medium text-slate-700">Email</span>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <span classname="block text-sm font-medium text-slate-700">Password</span>
          <input
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {mode == "Register" ? (
            <>
              <span classname="block text-sm font-medium text-slate-700">
                Activation Code
              </span>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
            invalid:border-pink-500 invalid:text-pink-600
            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="text"
                name="refferal_ode"
                id="refferalcode"
                placeholder="Refferal Code"
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <button
          className="dark:bg-sky-700   bg-sky-400 rounded-xl px-4 py-2"
          type="submit"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
