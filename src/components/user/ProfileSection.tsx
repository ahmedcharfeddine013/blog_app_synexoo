import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface ProfileSectionProps {
  name: string;
  id: string;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export default function ProfileSection({
  name,
  email,
  image,
}: ProfileSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
    </Card>
  );
}
