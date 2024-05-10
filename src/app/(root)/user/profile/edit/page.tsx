import EditProfileSection from "@/components/user/edit/EditProfileSection";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

export default async function UserEditProfilePage() {
  const user = await useCurrentUser();
  return (
    <div>{user && <EditProfileSection {...user}></EditProfileSection>}</div>
  );
}
