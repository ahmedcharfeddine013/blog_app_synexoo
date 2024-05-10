"use client";
import React, { useTransition } from "react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { The_Nautigal } from "next/font/google";

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
