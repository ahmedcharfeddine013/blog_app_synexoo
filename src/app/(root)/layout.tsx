import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Toaster />
    </>
  );
}
