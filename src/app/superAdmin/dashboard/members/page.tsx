"use client";

import { useGetAllmemberBySuperAdmin } from "@/app/hooks/useMember";
import { TableSkeleton } from "@/components/TableSkeleton";
import supabase from "@/lib/supabase/client";
import { useEffect } from "react";
import SuperAdminMembersTable from "./components/SuperAdminMembersTable";

const Members = () => {
  const { data, isLoading, refetch } = useGetAllmemberBySuperAdmin();

  useEffect(() => {
    const channel = supabase
      .channel("new-members-super-admin")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "member",
          filter: "activeStatus=eq.active",
        },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "member",
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      <SuperAdminMembersTable members={data ?? []} />
    </>
  );
};

export default Members;
