// pages/api/blogs.ts
'use server'

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import db from "@/db/db";
import fs from "fs/promises";
import * as z from "zod";

interface BlogData {
  title: string;
  summary: string;
  content: string;
  image: string;
}

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const addBlogSchema = z.object({
  title: z.string().min(1, "Title required"),
  summary: z.string().min(1, "Summary required"),
  content: z.string().min(1, "Content required"),
  cover: imageSchema.refine((image) => image.size > 0, "Cover image required!"),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Ensure session.user.email is not null or undefined before accessing it
  const userEmail = session.user?.email;

  if (!userEmail) {
    return res.status(400).json({ error: "User email not found in session" });
  }

  const result = addBlogSchema.safeParse(Object.fromEntries(req.body));
  const data = result.data;

  if (data == undefined) return res.status(400).json({ error: "Data failed" });

  await fs.mkdir("public/blog", { recursive: true });
  const imagePath = `/blog/${crypto.randomUUID()}-${data.cover.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.cover.arrayBuffer())
  );

  try {
    const newBlog = await db.blog.create({
      data: {
        title: data.content,
        summary: data.summary,
        content: data.content,
        author: { connect: { email: userEmail } },
        cover: imagePath,
      },
    });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
