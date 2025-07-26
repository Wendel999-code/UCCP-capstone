import {
  ApproveMemberInput,
  CountMemPerChurch,
  Member,
  MemberQueryResponse,
} from "@/global/type";
import {
  ApproveMembership,
  DeleteMember,
  GetAllCountMembersByChurchId,
  GetAllMemberPerChurchCount,
  GetApplicationID,
  GetMemberByID,
  GetMemberByIDBySuperAdmin,
  GetPendingApplication,
  UpdateMemberByID,
} from "@/lib/supabase/actions/member";
import {
  GetAllMembersBySuperAdmin,
  GetMembersByChurchId,
} from "@/lib/supabase/actions/memberV2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePendingMembers = () =>
  useQuery<Member[]>({
    queryKey: ["pending-members"],
    queryFn: async () => {
      const res = await GetPendingApplication();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useApproveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberID,
      acceptanceDate,
      officiant,
    }: ApproveMemberInput) => {
      const res = await ApproveMembership(memberID, acceptanceDate, officiant);
      if (!res.success) throw new Error(res.message);
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-members"] });
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-data"] });
      queryClient.invalidateQueries({ queryKey: ["membersBySuperAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["count-members-per-church"] });
      queryClient.invalidateQueries({
        queryKey: ["count-members-per-church-admin"],
      });
    },
  });
};

export const useGetMembersByChurchId = (
  page: number,
  pageSize: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
  category: string
) =>
  useQuery<MemberQueryResponse, Error>({
    queryKey: [
      "membersByChurchId",
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      category,
    ],
    queryFn: async (): Promise<MemberQueryResponse> => {
      const res = await GetMembersByChurchId(
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        category
      );
      if (!res.success) throw new Error("Failed to fetch members");
      return { data: res.data, count: res.count };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    retry: 1,
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
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
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
      queryClient.invalidateQueries({ queryKey: ["pending-members"] });
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["sidebar-data"] });
      queryClient.invalidateQueries({ queryKey: ["membersBySuperAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["count-members-per-church"] });
      queryClient.invalidateQueries({
        queryKey: ["count-members-per-church-admin"],
      });
    },
  });
};

// export const useDeleteMemberBySuperAdmin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (memberID: string) => {
//       const res = await DeleteMemberBySuperAdmin(memberID);
//       if (!res.success) throw new Error(res.message);
//       return res;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
//       queryClient.invalidateQueries({ queryKey: ["sidebar-data"] });
//       queryClient.invalidateQueries({ queryKey: ["membersBySuperAdmin"] });
//       queryClient.invalidateQueries({ queryKey: ["count-members-per-church"] });
//       queryClient.invalidateQueries({
//         queryKey: ["count-members-per-church-admin"],
//       });
//     },
//   });
// };

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
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useMemberDetailsBySuperAdmin = (memberID: string, open: boolean) =>
  useQuery<Member>({
    queryKey: ["member-details-super-admin", memberID],
    queryFn: async () => {
      const res = await GetMemberByIDBySuperAdmin(memberID);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    enabled: open,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

// export const useGetAllmemberBySuperAdmin = () =>
//   useQuery<Member[]>({
//     queryKey: ["membersBySuperAdmin"],
//     queryFn: async () => {
//       const res = await GetAllMembersBySuperAdmin();
//       if (!res.success) throw new Error(res.message);
//       return res.data;
//     },
//     staleTime: 5 * 60 * 1000,
//     gcTime: 30 * 60 * 1000,
//     retry: 1,
//     refetchOnWindowFocus: true,
//   });

export const useGetAllmemberBySuperAdmin = (
  page: number,
  pageSize: number,
  search: string,
  sortBy: string,
  sortOrder: "asc" | "desc",
  category: string,
  circuit:string
) =>
  useQuery<MemberQueryResponse, Error>({
    queryKey: [
      "membersByChurchId",
      page,
      pageSize,
      search,
      sortBy,
      sortOrder,
      category,
      circuit
    ],
    queryFn: async (): Promise<MemberQueryResponse> => {
      const res = await GetAllMembersBySuperAdmin(
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
        category,
        circuit
      );
      if (!res.success) throw new Error("Failed to fetch members");
      return { data: res.data, count: res.count ?? 0 };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    retry: 1,
    // placeholderData:(data)=>  data
  });

export const useCountMemPerChurch = () =>
  useQuery<CountMemPerChurch[]>({
    queryKey: ["count-members-per-church"],
    queryFn: async () => {
      const res = await GetAllMemberPerChurchCount();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      memberID,
      updatedData,
    }: {
      memberID: string;
      updatedData: Record<string, any>;
    }) => {
      const res = await UpdateMemberByID(null, memberID, updatedData);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["membersByChurchId"] });
      queryClient.invalidateQueries({ queryKey: ["membersBySuperAdmin"] });
      queryClient.invalidateQueries({
        queryKey: ["member-details", variables.memberID],
      });
    },
  });
};

export const useCountMemPerChurchAdmin = () =>
  useQuery<number>({
    queryKey: ["count-members-per-church-admin"],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,

    queryFn: async () => {
      const count = await GetAllCountMembersByChurchId();

      if (!count)
        throw new Error("Failed to fetch members  count per church admin");

      return count;
    },
  });
