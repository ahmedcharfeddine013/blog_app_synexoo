import { useState, ChangeEvent, FormEvent } from 'react';
import { AddBlog } from './_actions/blog';

interface Props {
  authorId: string;
}

function AddBlogForm({ authorId }: Props) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    summary: '',
    content: '',
    cover: undefined, // Initialize as undefined instead of null
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const newFormData: FormData = { ...formData }; // Explicitly define the FormData type
    if (files) {
      newFormData[name] = files[0]; // Cast files to File[]
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await AddBlog(authorId, formData);
    if (!result.success) {
      setError(typeof result.error === 'string' ? result.error : "Unknown error occurred");
    } else {
      setError(null);
      // Handle successful submission, e.g., redirect to the blog page
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
      <textarea name="content" value={formData.content} onChange={handleChange} />
      <input type="file" name="cover" onChange={handleChange} />
      <button type="submit">Submit</button>
      {error && <p>Error: {error}</p>}
    </form>
  );
}

export default AddBlogForm;
