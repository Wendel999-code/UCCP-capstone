import { Member } from "@/global/type";
import {
  ApproveMembership,
  GetAllMembersByChurchId,
  GetPendingApplication,
} from "@/lib/supabase/actions/member";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePendingMembers = () =>
  useQuery<Member[]>({
    queryKey: ["pending-members"],
    queryFn: async () => {
      const res = await GetPendingApplication();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });

export const useApproveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: string) => {
      const res = await ApproveMembership(memberId);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-members"] });
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-data"] });
    },
  });
};

export const useGetAllmemberByChurchId = () =>
  useQuery<Member[]>({
    queryKey: ["membersByChurchId"],
    queryFn: async () => {
      const res = await GetAllMembersByChurchId();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });
