"use client";

import NavigationBar from "@/components/custom/NavigationBar";
import Sidebar from "@/components/custom/Sidebar";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ({ children }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);

  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="w-full flex items-center px-2">
        <Button 
          onClick={() => {
            setSideBarOpen((prev) => !prev);
          }}
          className='bg-transparent px-1'
        >
          <Image
            src="/menuIcon.svg"
            height={24}
            width={24}
            alt="Menu Icon"
          ></Image>
        </Button>
      </div>

      <div className="h-full overflow-x-hidden overflow-y-auto pb-16 scroll-smooth">
        {children}
      </div>

      {/* Sidebar Implementation */}
      <div
        className={`h-full bg-neutral-900 fixed left-0 top-0 bottom-0 z-50 w-[70%]
        transform transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar setSideBarOpen={setSideBarOpen} 
        userdata={{ userProfileImage: '/profileImage.png', userName: 'Nikhil Mahamuni', userEmail: 'nikhilmahamuni250@gmail.com'}}
      ></Sidebar>
      </div>

      <div className="absolute left-0 w-full bottom-0">
        <NavigationBar></NavigationBar>
      </div>
    </div>
  );
}
