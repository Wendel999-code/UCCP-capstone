"use client";

import { useGetAllmemberBySuperAdmin } from "@/app/hooks/useMember";
import { TableSkeleton } from "@/components/TableSkeleton";
import React from "react";
import SuperAdminMembersTable from "./components/SuperAdminMembersTable";

const Members = () => {
  const { data, isFetching } = useGetAllmemberBySuperAdmin();

  if (isFetching) return <TableSkeleton />;

  return (
    <>
      <SuperAdminMembersTable members={data ?? []} />
    </>
  );
};

export default Members;
