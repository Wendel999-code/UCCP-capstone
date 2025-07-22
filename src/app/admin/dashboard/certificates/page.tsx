"use client";

import { useGetReqCertificate } from "@/app/hooks/useCertificate";
import supabase from "@/lib/supabase/client";
import { useEffect } from "react";
import BaptismCertificateTable from "./components/BaptismCertificateTable";

function Certicates() {
  const { data, isLoading, refetch } = useGetReqCertificate();

  useEffect(() => {
    const channel = supabase
      .channel("req_certificate")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "req_certificate",
        },
        () => {
          refetch();
        }
      )

      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  return (
    <div className="p-4">
      <BaptismCertificateTable
        certificates={data || []}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Certicates;
