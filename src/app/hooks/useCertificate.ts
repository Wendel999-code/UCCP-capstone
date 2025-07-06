import { CertificateDetails, CertificateRequest } from "@/global/type";
import {
  getCompletedCertificateRequestCount,
  GetReqCertificate,
  GetReqCertificateByID,
} from "@/lib/supabase/actions/certificate";
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

export const useGetReqCertificateByID = (reqID: string, open: boolean) =>
  useQuery<CertificateDetails>({
    queryKey: ["req-certificate-ByID", reqID],
    queryFn: async () => {
      const res = await GetReqCertificateByID(reqID);
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to fetch certificate.");
      }
      return res.data;
    },
    enabled: open,
    refetchOnWindowFocus: false,
  });

export const useCountCompletedReqCertificate = () =>
  useQuery<number>({
    queryKey: ["completed-req-certificate"],
    queryFn: getCompletedCertificateRequestCount,
  });
