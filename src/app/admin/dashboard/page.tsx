"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";

import { redirect, useRouter } from "next/navigation";

import React from "react";

const Page = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) return <TableSkeleton />;

  console.log("User in admin dashboard:", user);

  if (!user) redirect("/");

  if (user?.role !== "admin") router.push("/member/dashboard");

  return <div>page</div>;
};

export default Page;
