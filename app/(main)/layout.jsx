"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({ children }) {
  const { globalUserData, isLoading } = useAuthContext();
  const [localLoading, setLocalLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!globalUserData) {
        router.push("/auth/sign-in");
      } else {
        setLocalLoading(false);
      }
    }
  }, [globalUserData, isLoading, router]);

  if (isLoading || localLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[450px]">
        {children}
    </div>
  )
}
