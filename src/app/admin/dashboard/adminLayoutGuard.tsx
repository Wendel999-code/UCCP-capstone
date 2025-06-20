"use client";

import { useUser } from "@/app/provider/UserContext";
import LogoLoader from "@/components/LogoLoader";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user || user.role !== "church_admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) return <LogoLoader />;

  return <>{children}</>;
}
