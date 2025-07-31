"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";

const Page = () => {
  const { loading } = useUser();

  if (loading) return <TableSkeleton />;

  return (
    <>
      <AdminDashb />
    </>
  );
};

export default Page;
