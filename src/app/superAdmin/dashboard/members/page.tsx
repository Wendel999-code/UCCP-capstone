"use client";

import { useGetAllmemberBySuperAdmin } from "@/app/hooks/useMember";
import { TableSkeleton } from "@/components/TableSkeleton";
import SuperAdminMembersTable from "./components/SuperAdminMembersTable";

const Members = () => {
  const { data, isLoading } = useGetAllmemberBySuperAdmin();

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <SuperAdminMembersTable members={data ?? []} />
    </>
  );
};

export default Members;
