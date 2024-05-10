// AddBlogForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface FormData {
  title: string;
  summary: string;
  cover: string;
  content: string;
}

const AddBlogForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    summary: "",
    cover: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/blogs", formData);
      console.log(res.data);
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error(error);
      // Handle error
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
