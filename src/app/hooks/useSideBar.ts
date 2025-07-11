import { ManageChurchById } from "@/lib/supabase/actions/church";
import { GetPendingApplicationsCount } from "@/lib/supabase/actions/member";
import { useQuery } from "@tanstack/react-query";

export const useSidebarData = () =>
  useQuery({
    queryKey: ["sidebar-data"],
    queryFn: async () => {
      const [churchRes, countRes] = await Promise.all([
        ManageChurchById(),
        GetPendingApplicationsCount(),
      ]);

      if (!churchRes.success || !countRes.success)
        throw new Error("Failed to fetch sidebar data");

      return {
        church: churchRes.church,
        pendingCount: countRes.count,
      };
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
