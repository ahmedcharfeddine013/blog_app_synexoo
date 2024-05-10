"use server";

import db from "@/db/db";
import * as z from "zod";
import fs from "fs/promises";
import { useCurrentUser } from "@/hooks/use-current-user";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { getSession } from "next-auth/react";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addBlogSchema = z.object({
  title: z.string().min(1, "Title required"),
  summary: z.string().min(1, "Summary required"),
  content: z.string().min(1, "Content required"),
  cover: imageSchema.refine((image) => image.size > 0, "Cover image required!"),
});

export async function AddBlog(authorId: string, formData: FormData) {
  const result = addBlogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await fs.mkdir("public/blogs", { recursive: true });
  const imagePath = `/user/blogs/${crypto.randomUUID()}-${data.cover.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.cover.arrayBuffer())
  );

  await db.blog.create({
    data: {
      title: data.title,
      summary: data.summary,
      content: data.content,
      cover: imagePath,
      authorId: authorId,
    },
  });
}

const editSchema = addBlogSchema.extend({
  image: imageSchema.optional(),
});

export async function editBlog(
  userId: string,
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const blog = await db.blog.findUnique({
    where: { id },
  });

  if (!blog) return notFound();

  // Check if the user is authorized to edit the blog post
  if (blog.authorId !== userId) {
    throw new Error("You are not authorized to edit this blog post.");
  }

  let imagePath = blog.cover;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${blog.cover}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    );
  }

  await db.blog.update({
    where: { id },
    data: {
      title: data.title,
      summary: data.summary,
      content: data.content,
      cover: imagePath,
    },
  });

  revalidatePath("/");
}
