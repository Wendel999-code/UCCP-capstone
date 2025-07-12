"use client";

import { usePendingMembers } from "@/app/hooks/useMember";
import { TableSkeleton } from "@/components/TableSkeleton";
import supabase from "@/lib/supabase/client";
import { useEffect } from "react";
import ApplicationTable from "./components/ApplicationTable";

const Page = () => {
  const { data, isLoading, isError, error, refetch } = usePendingMembers();

  useEffect(() => {
    const channel = supabase
      .channel("new-applications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
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
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return <ApplicationTable pendingMember={data || []} />;
};

export default Page;
