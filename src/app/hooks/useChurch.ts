import { churchType } from "@/global/type";
import { GetAllChurches } from "@/lib/supabase/actions/church";
import { useQuery } from "@tanstack/react-query";

export const useGetAllChurches = () =>
  useQuery<churchType[]>({
    queryKey: ["churches"],
    queryFn: async () => {
      const res = await GetAllChurches();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });
