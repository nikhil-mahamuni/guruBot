import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href='/auth/sign-in'>
        <Button>Login</Button>
      </Link>
      <Link href='/auth/sign-in'>
        <Button>New Account</Button>
      </Link>
    </>
  );
}
