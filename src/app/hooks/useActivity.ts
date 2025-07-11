import { ActivityLog } from "@/global/type";
import { GetAllActivity } from "@/lib/utils/activity";
import { useQuery } from "@tanstack/react-query";

export const useGetAllActivity = () => {
  return useQuery<ActivityLog[]>({
    queryKey: ["activity-log"],
    queryFn: async () => {
      const res = await GetAllActivity();

      if (!res) throw new Error("Failed to fetch activity.");

      return res;
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
