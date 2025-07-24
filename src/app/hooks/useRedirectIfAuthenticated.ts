"use client";

import { roleRedirectMap, type UserRole } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../provider/UserContext";

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
