"use server";

import db from "@/db/db";
import * as z from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";
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

export async function AddBlog(prevState: unknown, formData: FormData) {
  const session = await getSession();

  if (!session) {
    return notFound();
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    return notFound();
  }

  const result = addBlogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success == false) {
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
      author: { connect: { email: userEmail } },
    },
  });

  redirect("/");
}

const editBlogSchema = addBlogSchema.extend({
  image: imageSchema.optional(),
});

export async function updateBlog(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const session = await getSession();

  if (!session) {
    return notFound();
  }

  const userEmail = session.user?.email;

  if (!userEmail) {
    return notFound();
  }

  const result = editBlogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success == false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const blog = await db.blog.findUnique({
    where: { id },
  });

  if (blog == null) return notFound();

  let imagePath = blog.cover;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${blog.cover}`);
    imagePath = `/user/blogs/${crypto.randomUUID()}-${data.image.name}`;
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
  redirect("/");
}
