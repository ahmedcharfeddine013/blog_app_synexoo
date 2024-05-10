"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AddBlog, editBlog } from "./_actions/blog";
import { Blog, User } from "@prisma/client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

null;
export default function BlogForm({
  blog,
  user,
}: {
  blog?: Blog | null;
  user?: User | null;
}) {
  const [error, action] = useFormState( blog == null ? AddBlog : editBlog.bind(null, user?.id, blog.id) , {});
  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          type="text"
          id="author"
          name="author"
          required
          defaultValue={user?.name}
        />
        {error?.title && <div className="text-red-500">{error.title}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={blog?.title || ""}
        />
        {error?.title && <div className="text-red-500">{error.title}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Input
          type="text"
          id="summary"
          name="summary"
          required
          defaultValue={blog?.summary || ""}
        />
        {error?.summary && <div className="text-red-500">{error.summary}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          required
          defaultValue={blog?.content}
        />
        {blog?.content && <div className="text-red-500">{blog.content}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={blog == null} />
        {blog != null && (
          <Image
            src={blog?.cover}
            height="400"
            width="400"
            alt="Product Image"
          />
        )}
        {blog?.cover && <div className="text-destructive">{blog.cover}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
