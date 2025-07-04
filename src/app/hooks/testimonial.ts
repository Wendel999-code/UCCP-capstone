import { Testimonial } from "@/global/type";
import { GetTestimonial } from "@/lib/supabase/actions/testimonial";
import { useQuery } from "@tanstack/react-query";

export const useGetTestimonial = () =>
  useQuery<Testimonial[]>({
    queryKey: ["get-testimonial"],
    queryFn: async () => {
      const res = await GetTestimonial();
      if (!res.success) throw new Error(res.message);
      return res?.data;
    },
  });
