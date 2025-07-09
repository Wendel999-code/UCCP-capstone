"use client";

import { useUser } from "@/app/provider/UserContext";
import LogoLoader from "@/components/LogoLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SuperAdminLayoutGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "super_admin")) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "super_admin") {
    return <LogoLoader />;
  }

  return <>{children}</>;
}
