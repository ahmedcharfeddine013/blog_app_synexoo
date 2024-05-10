import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import redirect from "next/navigation";
import ProfileSection from "@/components/user/ProfileSection";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center h-screen justify-center">
      {session?.user && <ProfileSection {...session.user} />}
    </div>
  );
}
