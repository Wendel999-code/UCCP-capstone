import { Testimonial } from "@/global/type";
import { GetTestimonial } from "@/lib/supabase/actions/testimonial";
import { ToggleLike } from "@/lib/supabase/actions/testimonialV2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTestimonial = () =>
  useQuery<Testimonial[]>({
    queryKey: ["get-testimonial"],
    queryFn: async () => {
      const res = await GetTestimonial();
      if (!res.success) throw new Error(res.message);
      return res?.data;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      testimonialId,
      isLiked,
    }: {
      testimonialId: string;
      isLiked: boolean;
    }) => {
      const res = await ToggleLike(testimonialId, isLiked);
      if (!res.success) throw new Error(res.message);
      return res;
    },
    onSuccess: () => {
      // Re-fetch testimonials to get updated like counts
      queryClient.invalidateQueries({ queryKey: ["get-testimonial"] });
    },
  });
};
