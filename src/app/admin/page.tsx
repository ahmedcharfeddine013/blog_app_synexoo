import React from "react";
import AdminPageHeader from "./_components/AdminPageHeader";
import db from "@/db/db";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatNumber } from "@/lib/formatters";

async function getUsers() {
  const [userCount, latestUsers] = await Promise.all([
    db.user.count(),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return {
    userCount,
    latestUsers,
  };
}

async function getBlogs() {
  const [blogCount, latestBlogs] = await Promise.all([
    db.blog.count(),
    db.blog.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  return {
    blogCount,
    latestBlogs,
  };
}

export default async function AdminHomePage() {
  const [usersData, blogsData] = await Promise.all([getUsers(), getBlogs()]);
  return (
    <div className="space-y-10">
      <AdminPageHeader>DASHBOARD</AdminPageHeader>
      <div className="w-full grid grid-cols-1 gap-5 place-items-center md:grid-cols-2">
        <DashboardCard
          title="Users number"
          body={formatNumber(usersData.userCount)}
        />
        <DashboardCard
          title="blogs number"
          body={formatNumber(blogsData.blogCount)}
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  body: string;
}

function DashboardCard({ title, body }: DashboardCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle> {body} </CardTitle>
        <CardDescription> {title} </CardDescription>
      </CardHeader>
    </Card>
  );
}
