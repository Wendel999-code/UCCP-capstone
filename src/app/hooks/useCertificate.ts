import { CertificateRequest } from "@/global/type";
import { GetReqCertificate } from "@/lib/supabase/actions/certificate";
import { useQuery } from "@tanstack/react-query";

export const useGetReqCertificate = () =>
  useQuery<CertificateRequest[]>({
    queryKey: ["req-certificate"],
    queryFn: async () => {
      const res = await GetReqCertificate();
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
  });
