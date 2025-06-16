import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider/UserContext";
import { redirect } from "next/navigation";

export function useAdminOnlyRoute() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      redirect("/");
    } else if (user.role !== "church_admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  return { loading, isAdmin: user?.role === "church_admin" };
}
