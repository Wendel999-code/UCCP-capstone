import { GetReqCertCount } from "@/lib/supabase/actions/certificateV2";
import { ManageChurchById } from "@/lib/supabase/actions/church";
import { GetPendingApplicationsCount } from "@/lib/supabase/actions/member";
import { useQuery } from "@tanstack/react-query";

export const useSidebarData = () =>
  useQuery({
    queryKey: ["sidebar-data"],
    queryFn: async () => {
      const [churchRes, countRes, countReqCert] = await Promise.all([
        ManageChurchById(),
        GetPendingApplicationsCount(),
        GetReqCertCount(),
      ]);

      if (!churchRes.success || !countRes.success)
        throw new Error("Failed to fetch sidebar data");

      return {
        church: churchRes.church,
        pendingCount: countRes.count,
        certCount: countReqCert.count,
      };
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
