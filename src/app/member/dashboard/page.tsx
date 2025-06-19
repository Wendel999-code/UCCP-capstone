"use client";

import React from "react";
import Welcome from "./components/welcome";
import { useUser } from "@/app/provider/UserContext";
import { redirect } from "next/navigation";
import { TableSkeleton } from "@/components/TableSkeleton";

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) return <div>loadinggg....</div>

  console.log("User in Dashboard:", user);

  if (!user) redirect("/");

  if (user?.role !== "member") return redirect("/");

  return (
    <div className="items-start">
      <Welcome />
    </div>
  );
};

export default Dashboard;
