"use client";

import React from "react";
import { nav_items } from "@/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="p-5 w-full border-r border-gray-300 h-screen">
      {/* logo */}

      <div className="w-full">
        <Link href="/">
          <h2 className="text-5xl font-bold text-gray-700">
            HR<span className="text-6xl text-gray-400">.</span>
          </h2>
        </Link>
      </div>

      {/* menu */}

      <div className="mt-10 w-full">
        {nav_items.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 py-2 w-full overflow-hidden"
          >
            {item.section_title ? (
              <p className="text-xs text-gray-400 section_title">
                {item.section_title}
              </p>
            ) : (
              <Link className="w-full" href={item.path ? item.path : "/"}>
                <div
                  className={`flex items-center gap-3 mb-2 cursor-pointer group hover:bg-gray-200 duration-150 w-full py-3 px-2 rounded ${
                    (item.path === "/" && pathname === "/") ||
                    (item.path &&
                      pathname.startsWith(item.path) &&
                      item.path !== "/")
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`w-5 h-5 text-gray-600 ${
                        (item.path === "/" && pathname === "/") ||
                        (item.path &&
                          pathname.startsWith(item.path) &&
                          item.path !== "/")
                          ? "text-white"
                          : ""
                      }`}
                    />
                  )}
                  <p
                    className={`text-gray-600 font-semibold ${
                      (item.path === "/" && pathname === "/") ||
                      (item.path &&
                        pathname.startsWith(item.path) &&
                        item.path !== "/")
                        ? "text-white"
                        : ""
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
