"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/constant";
import { useUser } from "../provider/UserContext";

const roleRedirectMap: Record<UserRole, string> = {
  church_admin: "/admin/dashboard",
  member: "/member/dashboard",
  super_admin: "/superAdmin",
};

export function useRedirectIfAuthenticated() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role) {
      const redirectPath = roleRedirectMap[user.role as UserRole];
      if (redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [user, loading, router]);

  return { loading, user };
}
