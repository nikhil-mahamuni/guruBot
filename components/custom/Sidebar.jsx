"use client";

import React from "react";
import Image from "next/image";

function Sidebar({ setSideBarOpen }) {
  return (
    <div className="p-3">
      <div className="w-full flex items-center justify-end">
        <Image
          src="/arrowLeftIcon.svg"
          height={25}
          width={25}
          alt="Menu Icon"
          onClick={() => setSideBarOpen((prev) => !prev)}
        ></Image>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
}

export default Sidebar;
