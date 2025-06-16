"use client";

import supabase from "@/lib/supabase/client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

type User = {
  role: string;
  id: string;
} | null;

interface UserContextType {
  user: User;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserRole = async () => {
    try {
      setLoading(true);
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        setUser(null);
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from("User")
        .select("id, role")
        .eq("id", authUser.id)
        .single();

      if (roleError) {
        toast.error(roleError.message);
        setUser(null);
      } else {
        setUser(roleData);
      }
    } catch (error) {
      console.error("Unexpected error in fetchUserRole:", error);
      toast.error("Unexpected error while loading user.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const safeFetch = async () => {
      await fetchUserRole();
    };
    safeFetch();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      if (isMounted) fetchUserRole();
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
