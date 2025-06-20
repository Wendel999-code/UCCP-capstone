"use client";

import { useUser } from "@/app/provider/UserContext";
import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import { TableSkeleton } from "@/components/TableSkeleton";

const Page = () => {
  const { loading } = useUser();

  if (loading) return <TableSkeleton />;

  return (
    <>
      <AdminDashboard />
    </>
  );
};

export default Page;
