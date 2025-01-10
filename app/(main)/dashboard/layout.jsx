"use client";

import NavigationBar from "@/components/custom/NavigationBar";
import Sidebar from "@/components/custom/Sidebar";
import UserTopBar from "@/components/custom/UserTopBar";
import { useState } from "react";

export default function ({ children }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="h-screen relative p-2 overflow-hidden flex flex-col gap-2">

      {/* Header Section */}
      <div className="w-full flex items-center ">
      <UserTopBar setSideBarOpen={setSideBarOpen}></UserTopBar>
      </div>

      <div className="h-full overflow-x-hidden overflow-y-auto pt-2 pb-16 scroll-smooth">
        {children}
      </div>

      {/* Sidebar Implementation */}
      <div
        className={`h-full bg-neutral-900 fixed left-0 top-0 bottom-0 z-50 w-[70%]
        transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen}></Sidebar>
      </div>

      <div className="absolute left-0 w-full bottom-0">
        <NavigationBar></NavigationBar>
      </div>
    </div>
  );
}
