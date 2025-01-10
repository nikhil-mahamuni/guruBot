"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: 1,
    path: "/homeIconNavbar.svg",
    urlPath: "/dashboard/home",
    name: "Home",
  },
  {
    id: 2,
    path: "/cubeIconNavbar.svg",
    urlPath: "/dashboard/explore",
    name: "Guru Bots",
  },
  {
    id: 3,
    path: "/chartIconNavbar.svg",
    urlPath: "/dashboard/activity",
    name: "Activity",
  },
];

function NavigationBar() {
  const [activeLink, setActiveLink] = useState("/dashboard/home");
  const pathname = usePathname();
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="flex bg-neutral-900 w-full h-12 items-center justify-between px-5">
      {navItems.map((item) => (
        <Link href={item.urlPath} key={item.id}>
          <div
            className={`flex items-center h-10 rounded-full 
            transition-all duration-300 
            ${
              activeLink === item.urlPath
                ? "px-4 gap-2 bg-mainColur scale-105"
                : "justify-center"
            }`}
          >
            <div>
              <Image
                src={item.path}
                height={25}
                width={25}
                alt={item.name}
              ></Image>
            </div>
            <span
              className={`${
                activeLink === item.urlPath
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 hidden transform -translate-x-4"
              } 
              text-lg`}
            >
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default NavigationBar;
