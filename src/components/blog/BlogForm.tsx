import { Blog } from "@prisma/client";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { AddBlog, updateBlog } from "./_actions/blog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button } from "../ui/button";

export default function BlogForm({ blog }: { blog?: Blog | null }) {
  const [error, action] = useFormState(
    blog == null ? AddBlog : updateBlog.bind(null, blog.id),
    {}
  );
  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="title">Name</Label>
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
        <Label htmlFor="summary">Name</Label>
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
        <Label htmlFor="content">Name</Label>
        <Input
          type="text"
          id="content"
          name="content"
          required
          defaultValue={blog?.content || ""}
        />
        {error?.content && <div className="text-red-500">{error.content}</div>}
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
        {error?.cover && <div className="text-destructive">{error.cover}</div>}
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
