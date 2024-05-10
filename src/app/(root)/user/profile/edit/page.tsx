
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";
import EditProfileSection from "./_components/EditProfileSection";

export default async function UserEditProfilePage() {
  const user = await useCurrentUser();
  return (
    <div>{user && <EditProfileSection {...user}></EditProfileSection>}</div>
  );
}
