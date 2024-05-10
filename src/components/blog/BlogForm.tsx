import React from "react";
import { Form } from "../ui/form";
import { useFormState, useFormStatus } from "react-dom";
import { AddBlog, editBlog } from "./_actions/blog";
import { Blog } from "@prisma/client";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";

null;
export default function BlogForm({ blog }: { blog?: Blog | null }) {
  const [error, action] = useFormState(
    blog == null ? AddBlog : editBlog.bind(null, blog.id),
    {}
  );
  return (
    <form action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Title</Label>
        <Input
          type="text"
          id="name"
          name="name"
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
        <Label htmlFor="priceInCents">Content</Label>
        <Input
          type="text"
          id="description"
          name="description"
          required
          defaultValue={blog?.summary}
        />
        {blog?.summary && <div className="text-red-500">{blog.summary}</div>}
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
