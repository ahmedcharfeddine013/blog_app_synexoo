// AddBlogForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addBlogSchema } from "@/app/api/blogs/route";
import { zodResolver } from "@hookform/resolvers/zod";

// interface FormData {
//   title: string;
//   summary: string;
//   cover: string;
//   content: string;
// }

const AddBlogForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addBlogSchema>>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      cover : undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof addBlogSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.title,
        summary: values.summary,
        content: values.content,
        cover: values.cover,
      }),
    });
    if (response.ok) {
      router.push("/");
    } else {
      console.log("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <Textarea
        name="summary"
        value={formData.summary}
        onChange={handleChange}
      ></Textarea>
      <Input
        type="file"
        name="cover"
        value={formData.cover}
        onChange={handleChange}
      />
      <Textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
      ></Textarea>
      <Button type="submit">Add Blog</Button>
    </form>
  );
};

export default AddBlogForm;
