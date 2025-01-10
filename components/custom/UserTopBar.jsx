import Image from "next/image";
import React from "react";

function UserTopBar({ setSideBarOpen }) {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <div className="rounded-full">
          <Image
            src="/profileImage.png"
            width={42}
            height={42}
            alt="logo"
            className="rounded-full"
            onClick={() => setSideBarOpen((prev) => !prev)}
          ></Image>
        </div>

        <div className="flex flex-col items-start">
          <h1 className="text-lg tracking-wide font-semibold">Hello, Nikhil</h1>
          <span className="text-sm text-gray-400">welcome to guru bots</span>
        </div>
      </div>
    </div>
  );
}

export default UserTopBar;
