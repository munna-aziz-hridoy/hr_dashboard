"use client";

import React from "react";
import { Logo } from "@/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

type Props = {
  children: React.ReactNode;
};

function Auth({ children }: Props) {
  const pathname = usePathname();

  return (
    <main className="bg-bodyColor flex justify-center items-center h-screen">
      <div className="max-w-4xl shadow-shadowUp bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center min-w-[650px] border-b border-dashed border-textSecondColor mb-5">
          <div>
            <Logo />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-3xl font-medium py-2 text-textColor">
              {pathname.includes("signin") ? "Login" : "Register"}
              <Link
                href={
                  pathname.includes("signin") ? "/auth/signup" : "/auth/signin"
                }
              >
                <span className="ml-3 text-sm text-primary/60">
                  / {pathname.includes("signin") ? "Sign Up" : "Sign In"}
                </span>
              </Link>
            </h2>
            <p className="text-textSecondColor text-sm lg:text-base">
              {pathname.includes("signin")
                ? "Welcome Back"
                : "Welcome. Please Provide information to register"}
            </p>
          </div>
        </div>
        {children}
        <div className="flex items-center my-2">
          <div className="w-1/2 h-[2px] bg-primary/25" />
          <p className="bg-white px-3">OR</p>
          <div className="w-1/2 h-[2px] bg-primary/25" />
        </div>
        <button className="w-full min-h-12 px-2 py-1 rounded bg-white/70 hover:bg-primary/5 text-textColor font-semibold mt-4 duration-300 flex justify-center items-center gap-2 border border-primary/10 shadow-sm">
          <FcGoogle fontSize={24} />
          Sign In with Google
        </button>
      </div>
    </main>
  );
}

export default Auth;
