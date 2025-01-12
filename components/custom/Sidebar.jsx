"use client";

import React from "react";
import Image from "next/image";

function Sidebar({ setSideBarOpen, userdata }) {
  const { userProfileImage, userName, userEmail } = userdata;
  return (
    <div className="p-3 overflow-hidden flex flex-col relative gap-2 h-full border-r-[1px] border-gray-500">
      {/* navigate back */}
      <div className="w-full flex items-center justify-end">
        <Image
          src="/arrowLeftIcon.svg"
          height={25}
          width={25}
          alt="Menu Icon"
          onClick={() => setSideBarOpen((prev) => !prev)}
        ></Image>
      </div>

      {/* Profile */}
      <div>
        {userProfileImage && (
          <div className="flex flex-col items-start gap-2">
            <Image
              src={userProfileImage}
              height={45}
              width={45}
              alt="profile image"
              onClick={() => setSideBarOpen((prev) => !prev)}
            ></Image>
            <div className="flex flex-col items-start">
              <h1 className="text-xl tracking-wide">{userName}</h1>
              <p className="text-sm line-clamp-1 ">{userEmail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <span>
            <Image
              src="/settingIcon.svg"
              height={25}
              width={25}
              alt="Menu Icon"
              onClick={() => setSideBarOpen((prev) => !prev)}
            ></Image>
          </span>
          <h1 className="text-lg">Settings</h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
