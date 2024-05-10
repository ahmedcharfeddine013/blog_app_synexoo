import { useFormState } from "react-dom";
import { AddBlog } from "./_actions/blog";

import { getSession } from "next-auth/react";

export default async function AddBlogForm() {
    const session = await getSession() 
    const user = session?.user
    const [error, action] = useFormState<
    { title?: string; summary?: string; content?: string; cover?: string } | undefined
  >(formData => AddBlog(user?.id, formData), {}); // Using AddBlog action for adding a new blog post

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await action(formData);
      // Handle successful form submission
      console.log("Form submitted successfully!");
    } catch (error) {
      // Handle form submission errors
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
        {/* Add error handling for title if needed */}
      </div>
      <div className="space-y-2">
        <label htmlFor="summary">Summary</label>
        <input type="text" id="summary" name="summary" required />
        {/* Add error handling for summary if needed */}
      </div>
      <div className="space-y-2">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" required />
        {/* Add error handling for content if needed */}
      </div>
      <div className="space-y-2">
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" required />
        {/* Add error handling for image if needed */}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
