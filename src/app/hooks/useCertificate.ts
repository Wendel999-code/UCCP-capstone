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

// export const useGetReqCertificateByID = (reqID: string, open: boolean) =>
//   useQuery<GeneratedCertificate>({
//     queryKey: ["req-certificate-ByID", reqID],
//     queryFn: async () => {
//       const res = await GetReqCertificateByID(reqID);
//       if (!res) throw new Error("No certificate found");

//       console.log(res);
//       return res;
//     },
//     enabled: open,
//     refetchOnWindowFocus: false,
//   });
