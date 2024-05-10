"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";


export default function SignOutButton() {
  return (
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
  );
}
