import AdminNavbar from "./_components/AdminNavbar";
import { AdminNavLink } from "./_components/AdminNavbar";
export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNavbar>
        <AdminNavLink href={"/admin"}>Dashboard</AdminNavLink>
        <AdminNavLink href={"/admin/users"}>Users</AdminNavLink>
        <AdminNavLink href={"/admin/blogs"}>Blogs</AdminNavLink>
      </AdminNavbar>
      <div className="pl-[14rem] py-10 ">{children}</div>
    </>
  );
}
