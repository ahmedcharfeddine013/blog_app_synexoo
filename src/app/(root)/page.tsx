import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AddBlogButton from "../../components/blog/AddBlogButton";
import db from "@/db/db";

async function getblogs() {
  return await db.blog.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function UserHomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const blogs = await getblogs();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AddBlogButton />
      </div>
      <div>
        {blogs && blogs.map((blog) => <p key={blog.id}>{blog.title}</p>)}
      </div>
    </main>
  );
}
