import React from "react";
import { Sidebar } from "@/components";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex w-full">
      <aside className="w-[250px]">
        <Sidebar />
      </aside>
      <main className="w-[calc(100%-250px)] p-5">{children}</main>
    </div>
  );
}

export default MainLayout;
