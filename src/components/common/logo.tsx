import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.webp";

function Logo() {
  return (
    <div className="flex justify-start items-center">
      <div className="w-36 h-28 relative">
        <Image src={logo} alt="logo" layout="fill" />
      </div>
      <h1 className="text-3xl font-bold text-white">InCube</h1>
    </div>
  );
}

export default Logo;
