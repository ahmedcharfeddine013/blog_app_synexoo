"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export default function AdminNavbar({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-primary flex-col w-48 h-screen fixed items-center text-primary-foreground flex justify-center gap-2
    py-3 px-4">
      {children}
    </nav>
  );
}

export function AdminNavLink(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathname = usePathname();

  return (
    <Link
      {...props}
      className={`p-4 hover:bg-secondary w-full transition-all duration-100 ease-in rounded-md hover:text-secondary-foreground ${
        pathname === props.href && "bg-background text-foreground "
      } `}
    />
  );
}
