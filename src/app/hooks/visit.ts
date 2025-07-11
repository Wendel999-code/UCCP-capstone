import { getVisitorCount } from "@/lib/supabase/actions/visit";
import { useQuery } from "@tanstack/react-query";

export const useVisitCount = () =>
  useQuery<number>({
    queryKey: ["visit-count"],
    queryFn: async () => {
      const count = await getVisitorCount();

      if (!count) throw new Error("Failed to fetch visit count");

      return count;
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
