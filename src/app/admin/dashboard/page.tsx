"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import AdminDashboard from "./components/AdminDashboard";

const Page = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  if (loading) return <TableSkeleton />;

  if (!user) redirect("/");

  if (user?.role !== "church_admin") router.replace("/");

  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default Page;
