import { UserAccounts as UserType } from "@/global/type";
import {
  DeleteUser,
  ToggleBlock,
  UserAccounts,
} from "@/lib/supabase/actions/authV2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserAccounts = (page: number, pageSize: number) =>
  useQuery<UserType, Error>({
    queryKey: ["userAccounts", page, pageSize],
    queryFn: async (): Promise<UserType> => {
      const res = await UserAccounts(page, pageSize);

      if (!res.success) throw new Error("Failed to fetch user accounts.");

      return { user: res?.user, count: res?.count ?? 0 };
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
    retry: 1,
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await DeleteUser(userId);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAccounts"] });
    },
  });
};

export const useUserToggleBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      isBlock,
    }: {
      userId: string;
      isBlock: boolean;
    }) => {
      const res = await ToggleBlock(userId, isBlock);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAccounts"] });
    },
  });
};
