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
  });
