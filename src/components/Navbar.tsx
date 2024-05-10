import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./SignOutButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex w-screen items-center justify-center p-4 bg-secondary fixed">
      {session?.user ? (
        <SignOutButton></SignOutButton>
      ) : (
        <Link href={"/auth/sign-in"}>Sign in</Link>
      )}
    </div>
  );
}
