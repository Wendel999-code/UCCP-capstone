"use client";

import React, { useEffect, useState } from "react";
import { GetPendingApplication } from "@/lib/supabase/actions/member";
import { TableSkeleton } from "@/components/TableSkeleton";
import ApplicationTable from "./components/ApplicationTable";
import { Member } from "../members/page";
import { toast } from "react-toastify";

const Page = () => {
  const [pendingMembers, setPendingMembers] = useState<Member[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      const res = await GetPendingApplication();
      if (!res?.success) {
        toast.error(res?.message || "Failed to fetch pending members");
      } else {
        setPendingMembers(res.data);
      }
      setFetching(false);
    };

    fetchPending();
  }, []);

  if (fetching) return <TableSkeleton />;

  return <ApplicationTable pendingMember={pendingMembers} />;
};

export default Page;
