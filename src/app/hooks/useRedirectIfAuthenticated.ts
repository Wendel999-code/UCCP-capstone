"use client";

import { roleRedirectMap, type UserRole } from "@/constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "../provider/UserContext";

interface RedirectOptions {
  disabled?: boolean; // manually disable redirect behavior
}

export function useRedirectIfAuthenticated(options?: RedirectOptions) {
  const { user, loading } = useUser();
  const router = useRouter();

  const disabled = options?.disabled ?? false;

  useEffect(() => {
    if (disabled) return;

    if (!loading && user?.role) {
      const redirectPath = roleRedirectMap[user.role as UserRole];
      if (redirectPath) {
        router.replace(redirectPath);
      }
    }
  }, [user, loading, router, disabled]);

  return { loading, user };
}
