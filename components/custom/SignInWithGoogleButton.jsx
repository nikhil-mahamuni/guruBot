import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { handleSignInWithGoogle } from "@/services/user-auth-services";

function SignInWithGoogleButton() {
  return (
    <Button
      className="bg-neutral-900 min-w-[70%]"
      onClick={() => {
        console.log("Button clicked"); // Debug button click
        handleSignInWithGoogle();
      }}
    >
      <Image
        src="/google-logo.svg"
        height={25}
        width={25}
        alt="Google Logo"
      ></Image>
      <span className="text-lg">Google</span>
    </Button>
  );
}

export default SignInWithGoogleButton;
