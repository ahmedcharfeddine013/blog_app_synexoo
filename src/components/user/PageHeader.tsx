import React, { ReactNode } from "react";

export default function UserPageHeader({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl text-secondary-foreground">{children}</h1>;
}
