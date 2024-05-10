import React from "react";
import BlogForm from "../../../../components/blog/BlogForm";
import { useCurrentUser } from "@/hooks/use-current-user";
import AddBlogForm from "@/components/blog/AddBlogForm";

export default async function AddBlogUserPage() {
    const user = await useCurrentUser()
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <AddBlogForm />
    </div>
  );
}
