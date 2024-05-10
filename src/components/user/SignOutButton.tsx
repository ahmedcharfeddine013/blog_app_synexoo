"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export default function SignOutButton() {
  return (
    <div className="flex items-center justify-center gap-5">
      <Link
        href={"/user/profile"}
        className="p-3 border rounded-full border-primary"
      >
        {" "}
        <User />{" "}
      </Link>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: "/auth/sign-in",
          })
        }
        variant="destructive"
      >
        Sign Out
      </Button>
    </div>
  );
}
