"use client";

import { useGetAllmemberByChurchId } from "@/app/hooks/useMember";
import { TableSkeleton } from "@/components/TableSkeleton";
import { toast } from "react-toastify";
import MembersTable from "./components/MembersTable";

const MembersPage = () => {
  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useGetAllmemberByChurchId();

  if (isLoading) return <TableSkeleton />;

  if (isError) {
    toast.error(error.message || "Failed to fetch members");
    return null;
  }

  return <MembersTable members={members || []} />;
};

export default MembersPage;
