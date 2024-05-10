"use client";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="text-2xl font-bold">
        Blogui<span className="text-green-700">FY</span>
      </h1>
    </Link>
  );
}
