"use client";

import React, { useState } from "react";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function SignIn() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div>
      {/* email input */}
      <div>
        <label className="font-medium my-2 inline-block text-primary">
          Email or User Name
        </label>
        <input
          className="w-full bg-primary/5 outline-none border border-primary/10 rounded py-1 min-h-12 px-2"
          type="text"
          placeholder="example@email.com"
          autoComplete="off"
        />
      </div>
      <div className="mt-5 relative">
        <label className="font-medium my-2 inline-block text-primary">
          Password
        </label>
        <input
          className="w-full bg-primary/5 outline-none border border-primary/10 rounded py-1 min-h-12 px-2 relative"
          type={showPass ? "text" : "password"}
          placeholder="Your password"
          autoComplete="off"
        />

        {showPass ? (
          <IoEyeOffOutline
            onClick={() => setShowPass(false)}
            className="absolute right-3 top-12 text-2xl text-textSecondColor cursor-pointer"
          />
        ) : (
          <IoEyeOutline
            onClick={() => setShowPass(true)}
            className="absolute right-3 top-12 text-2xl text-textSecondColor cursor-pointer"
          />
        )}
      </div>

      {/* remember */}

      <div className="flex items-center mt-3">
        <input
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <label
          htmlFor="checked-checkbox"
          className="ms-2 text-sm font-medium text-gray-900"
        >
          Remember me
        </label>
      </div>

      <button className="w-full min-h-12 px-2 py-1 rounded bg-primary/70 hover:bg-primary text-white font-semibold mt-4 duration-300">
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
