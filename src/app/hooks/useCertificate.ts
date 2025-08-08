import { CertificateDetails, CertificateRequest } from "@/global/type";
import {
  getCompletedCertificateRequestCount,
  GetReqCertificate,
  GetReqCertificateByID,
  GetReqCertificateByUserID,
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
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useGetReqCertificateByID = (
  reqID: string,
  member_id: string,
  open: boolean
) =>
  useQuery<CertificateDetails>({
    queryKey: ["req-certificate-ByID", reqID],
    queryFn: async () => {
      const res = await GetReqCertificateByID(reqID, member_id);
      if (!res.success || !res.data) {
        throw new Error(res.error || "Failed to fetch certificate.");
      }
      return res.data;
    },
    enabled: open,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

export const useCountCompletedReqCertificate = () =>
  useQuery<number>({
    queryKey: ["completed-req-certificate"],
    queryFn: getCompletedCertificateRequestCount,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });

export const useGetReqCertificateByMemberID = (user_id: string) =>
  useQuery<CertificateRequest[]>({
    queryKey: ["req-certificate-by-member", user_id],
    queryFn: async () => {
      const res = await GetReqCertificateByUserID(user_id);
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    enabled: !!user_id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
