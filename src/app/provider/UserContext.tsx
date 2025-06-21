"use client";

import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import supabase from "@/lib/supabase/client";
import { fetchCurrentUser } from "@/lib/supabase/actions/auth";

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
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [queryClient]);

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
