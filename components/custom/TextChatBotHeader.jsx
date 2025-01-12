import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useChatContext } from "@/context/TextChatContext";

export default function TextChatBotHeader() {
  const { switchedBot, activeBot, clearChatHistory } = useChatContext();
  return (
    <>
      <div className="flex items-center relative justify-between">
        <Link href="/dashboard/explore">
          <Button className="p-1 h-10 w-10 bg-neutral-900 rounded-full">
            <div className="">
              <Image
                src="/leftIcon.svg"
                height={25}
                width={25}
                alt="Left Icon"
              ></Image>
            </div>
          </Button>
        </Link>

        <h1 className="text-2xl">
          <span className="text-mainColur tracking-wide font-semibold">
            Guru
          </span>
          Bot
        </h1>

        {/* Option Menus */}
        <OptionMenus
          switchedBot={switchedBot}
          activeBot={activeBot}
          clearChatHistory={clearChatHistory}
        ></OptionMenus>
      </div>
    </>
  );
}

function OptionMenus({ switchedBot, activeBot, clearChatHistory }) {
  const bots = [
    { id: "GeminiBot", name: "Gemini" },
    { id: "GPTBot", name: "GPT-4" },
    { id: "BardBot", name: "Bard" },
  ];

  return (
    <Popover>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <Button className="p-1 h-10 w-10 bg-neutral-900 rounded-full hover:bg-neutral-800">
          <Image src="/moreICon.svg" height={30} width={30} alt="Menu Icon" />
        </Button>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent className="p-2 w-40 bg-neutral-900 text-white border-none flex flex-col gap-2">
        
        {/* New Chat Button */}
        <Button
          onClick={clearChatHistory}
          className="flex items-center gap-2 bg-transparent hover:bg-neutral-800 text-white w-full justify-start"
        >
          <Image src="/newChatIcon.svg" height={22} width={22} alt="New Chat Icon" />
          <span>New Chat</span>
        </Button>

        {/* Bot Selection Header */}
        <header className="text-gray-500 text-sm mt-2">Choose Bot</header>

        {/* Bot Options */}
        {bots.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => switchedBot(id)}
            className={
              `w-full text-left px-2 py-1 rounded-md transition-colors
              ${`id === activeBot ? "bg-mainColur text-white" : "hover:bg-neutral-800`}`
            }
          >
            {name}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

