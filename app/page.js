import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full p-3 justify-between">
      <header className="text-center tracking-wider mt-10">
        <h1 className="text-2xl">
          <span className="font-semibold text-mainColur">Guru{"   "}</span>
          Your Ultimate Hub for Smart Bots!
        </h1>
      </header>

      <div className="text-center flex flex-col gap-4 mb-4">
        <div className="w-full flex items-center justify-center ">
          <h1 className="px-4 py-1 bg-mainColur rounded-full">Version: V1</h1>
        </div>
        <div>
          <p>Welcome to Guru Bots! How can our AI masters assist you today?</p>
        </div>
        <Link href="/auth/sign-in">
          <Button className="bg-mainColur w-full h-12 text-xl rounded-lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
