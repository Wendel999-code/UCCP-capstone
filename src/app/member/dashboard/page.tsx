"use client";

import { useUser } from "@/app/provider/UserContext";
import { TableSkeleton } from "@/components/TableSkeleton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Welcome from "./components/welcome";

const Dashboard = () => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (user.role !== "member") {
        router.push("/");
      }
    }
  }, [loading, user, router]);

  if (loading) return <TableSkeleton />;

  // Optionally block rendering if redirecting
  if (!user || user.role !== "member") return null;

  return (
    <div className="items-start">
      <Welcome />
    </div>
  );
};

export default Dashboard;
