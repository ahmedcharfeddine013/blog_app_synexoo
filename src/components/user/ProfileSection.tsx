import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { UserProps } from "./edit/types/user";

export default function ProfileSection({ name, email, image }: UserProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={"/user/profile/edit"}>Edit Profile</Link>
      </CardContent>
    </Card>
  );
}
