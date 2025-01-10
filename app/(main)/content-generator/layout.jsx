"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ContentGeneratorLayout({ children }) {
  const router = useRouter()
  return (
    <div className="h-full px-4 py-3 overflow-hidden w-full flex flex-col gap-4">
      {/* Top Panel */}
      <Button
      onClick={() => router.back()}
      className="p-1 h-10 w-10 bg-neutral-900 rounded-full">
        <div className="">
          <Image
            src="/leftIcon.svg"
            height={25}
            width={25}
            alt="Left Icon"
          ></Image>
        </div>
      </Button>

      <div className="flex-1">{children}</div>
    </div>
  );
}
