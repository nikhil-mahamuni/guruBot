import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function TextChatBotHeader() {
  return (
    <div>
      <div className="flex items-center justify-between">
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

        <div>
          <Button className="p-1 h-10 w-10 bg-neutral-900 rounded-full">
            <div className="">
              <Image
                src="/moreICon.svg"
                height={30}
                width={30}
                alt="Left Icon"
              ></Image>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TextChatBotHeader;
