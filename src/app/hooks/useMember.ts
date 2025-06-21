import { Member } from "@/global/type";
import {
  ApproveMembership,
  DeleteMember,
  GetAllMembersByChurchId,
  GetApplicationID,
  GetMemberByID,
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

export const useApplicationDetails = (memberID: string, open: boolean) =>
  useQuery<Member>({
    queryKey: ["application-details", memberID],
    queryFn: async () => {
      const res = await GetApplicationID(memberID);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    enabled: open,
    refetchOnWindowFocus: false,
  });

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberID: string) => {
      const res = await DeleteMember(memberID);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-data"] });
    },
  });
};

export const useMemberDetails = (memberID: string, open: boolean) =>
  useQuery<Member>({
    queryKey: ["member-details", memberID],
    queryFn: async () => {
      const res = await GetMemberByID(memberID);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    enabled: open,
    refetchOnWindowFocus: false,
  });
