import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import AddBlogButton from '../../components/blog/AddBlogButton';

export default async function UserHomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AddBlogButton />
      </div>
      {session?.user.name}
    </main>
  );
}
