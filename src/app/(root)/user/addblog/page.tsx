import React from "react";
import BlogForm from "../../../../components/blog/BlogForm";
import { useCurrentUser } from "@/hooks/use-current-user";

export default async function AddBlogUserPage() {
    const user = await useCurrentUser()
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <BlogForm user={user} />
    </div>
  );
}
