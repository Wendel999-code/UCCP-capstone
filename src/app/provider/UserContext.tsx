"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useContext, useMemo } from "react";

// import { fetchCurrentUser } from "@/lib/supabase/actions/auth";
import { fetchCurrentUserV2 } from "@/lib/supabase/actions/authV2";

type User = {
  role: string;
  id: string;
} | null;

interface UserContextType {
  user: User;
  loading: boolean;
  refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUserV2,
    staleTime: 60 * 60 * 1000,
  });

  const value = useMemo(
    () => ({ user: user ?? null, loading, refetch }),
    [user, loading, refetch]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
