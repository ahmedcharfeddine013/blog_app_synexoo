import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./user/SignOutButton";
import Link from "next/link";
import Logo from "./Logo";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-screen items-center justify-between py-4 px-20 bg-secondary fixed">
      <Logo />
      {session?.user ? (
        <SignOutButton></SignOutButton>
      ) : (
        <Link href={"/auth/sign-in"}>Sign in</Link>
      )}
    </div>
  );
}
