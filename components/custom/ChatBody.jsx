import React from "react";
import Image from "next/image";

function ChatBody({ chatHistory }) {
  return (
    <>
      {chatHistory &&
        chatHistory.map((item, index) => {
          const { role, data } = item;

          return (
            <div
              key={index}
              className={`w-full flex gap-1 ${
                role === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div className={`${role === "bot" ? "flex-shrink-0" : "hidden"}`}>
                <div className="bg-mainColur p-2 rounded-full">
                  <Image
                    src="/botChatIcon.svg"
                    height={24}
                    width={24}
                    alt="Bot Icon"
                  ></Image>
                </div>
              </div>

              <div
                className={`${
                  role === "bot" ? "bg-neutral-900" : "bg-mainColur"
                } 
                overflow-hidden max-w-[80%] rounded-lg p-2 `}
              >
                <p className=" break-words whitespace-pre-wrap">{data}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default ChatBody;
