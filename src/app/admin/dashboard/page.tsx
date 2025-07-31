"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import AdminDashboard from "./components/AdminDashboard";

const Page = () => {
  const { loading } = useUser();

  if (loading) return <TableSkeleton />;

  return (
    <>
      <AdminDashboar />
    </>
  );
};

export default Page;
