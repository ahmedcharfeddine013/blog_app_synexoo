

import { useFormState } from "react-dom";
import { AddBlog } from "./_actions/blog";

import { getSession } from "next-auth/react";
import { useTransition } from "react";

export default async function AddBlogForm() {
    const session = await getSession() 
    const user = session?.user
    


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
