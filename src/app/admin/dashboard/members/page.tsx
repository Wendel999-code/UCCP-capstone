"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MembersTable from "./components/MembersTable";
import { useGetAllmemberByChurchId } from "@/app/hooks/useMember";

const MembersPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  const {
    data: members,
    isLoading,
    isError,
    error,
  } = useGetAllmemberByChurchId();

  if (loading || isLoading) return <TableSkeleton />;

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role !== "church_admin") {
    router.push("/member/dashboard");
    return null;
  }

  if (isError) {
    toast.error(error.message || "Failed to fetch members");
    return null;
  }

  return <MembersTable members={members || []} />;
};

export default MembersPage;
