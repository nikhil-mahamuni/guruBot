"use client";

import React from "react";
import Image from "next/image";
import { useChatContext } from "@/context/TextChatContext";

export default function Page() {
  const { chatHistory, activeBot } = useChatContext();
  console.log(chatHistory);
  
  return (
    <>
      {chatHistory &&
        chatHistory.map((item, index) => {
          
          const { role, content, botUsed } = item;

          return (
            <div
              key={index}
              className={`w-full flex ${
                role === "bot" ? "flex-col justify-start" : "justify-end"
              }`}
            >
              <div className={`${role === "bot" ? "flex items-center gap-1" : "hidden"}`}>
                <div className="w-fit">
                  <Image
                    src="/starsChatBodyIcon.svg"
                    height={24}
                    width={24}
                    alt="Bot Icon"
                  ></Image>
                </div>
                <h1 className="text-mainColur font-semibold">{botUsed}</h1>
              </div>

              <div
                className={`${
                  role === "bot" ? "py-1 pb-2" : "bg-mainColur py-2 rounded-md"
                } 
                overflow-hidden px-2 text-left`}
              >
                <p className=" break-words whitespace-pre-wrap">{content}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
