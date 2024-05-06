"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

export default function AdminNavbar({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
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
      className={`p-4 hover:bg-secondary hover:text-secondary-foreground ${
        pathname === props.href && "bg-background text-foreground "
      } `}
    />
  );
}
