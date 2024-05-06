import React, { ReactNode } from "react";

export default function AdminPageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl font-bold">{children}</h1>;
}
