"use client";

import React from "react";
import { TableSkeleton } from "@/components/TableSkeleton";
import ApplicationTable from "./components/ApplicationTable";
import { usePendingMembers } from "@/app/hooks/useMember";

const Page = () => {
  const { data, isLoading, isError, error } = usePendingMembers();

  if (isLoading) return <TableSkeleton />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return <ApplicationTable pendingMember={data || []} />;
};

export default Page;
