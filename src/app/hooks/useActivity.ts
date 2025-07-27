import { ActivityLog } from "@/global/type";
import { GetAllActivity } from "@/lib/utils/activity";
import { useQuery } from "@tanstack/react-query";

export const useGetAllActivity = (page: number, pageSize: number) => {
  return useQuery<{ data: ActivityLog[]; count: number }>({
    queryKey: ["activity-log", page, pageSize],
    queryFn: async () => {
      const res = await GetAllActivity(page, pageSize);

      if (!res.success) throw new Error("Failed to fetch activity.");

      return { data: res.data, count: res.count ?? 0 };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
