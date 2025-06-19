import { useQuery } from "@tanstack/react-query";
import { ManageChurchById } from "@/lib/supabase/actions/church";
import { GetPendingApplicationsCount } from "@/lib/supabase/actions/member";

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
        brgy: churchRes.brgy,
        pendingCount: countRes.count,
      };
    },
  });
