"use client";

import React, { Fragment } from "react";
import { usePathname } from "next/navigation";
import Auth from "./auth";
import MainLayout from "./main";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const pathname = usePathname();

  return (
    <Fragment>
      {pathname.includes("auth") ? (
        <Auth>{children}</Auth>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </Fragment>
  );
}

export default Layout;
