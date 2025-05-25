"use client";

import supabase from "@/lib/supabase/supabaseClient/supabaseClient";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";

type User = {
  role: string;
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
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    const { data: roleData, error: roleError } = await supabase
      .from("User")
      .select("role")
      .eq("email", authUser.email)
      .single();

    if (roleError) {
      toast.error(roleError.message);
      setUser(null);
    } else {
      setUser(roleData);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserRole();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUserRole();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
