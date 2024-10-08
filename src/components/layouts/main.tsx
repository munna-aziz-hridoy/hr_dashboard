import React from "react";
import { Sidebar } from "@/components";
import { Toaster } from "react-hot-toast";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  return (
    <div className="flex w-full h-screen">
      {/* Sidebar with sticky positioning */}
      <aside className="w-[250px] h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-5 overflow-y-auto">{children}</main>

      {/* Toaster notifications */}
      <Toaster />
    </div>
  );
}

export default MainLayout;
