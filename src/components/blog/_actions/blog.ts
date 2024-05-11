"use server";

import db from "@/db/db";
import * as z from "zod";
import fs from "fs/promises";
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
  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `/products/${crypto.randomUUID()}-${data.cover.name}`;
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
}
