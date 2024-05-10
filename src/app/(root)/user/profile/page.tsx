import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import ProfileSection from "@/components/user/ProfileSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center h-screen justify-center">
      
      {session?.user && <ProfileSection {...session.user} />}
    </div>
  );
}
