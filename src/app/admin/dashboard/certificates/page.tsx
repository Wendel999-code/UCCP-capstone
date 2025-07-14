"use client";

import { useGetReqCertificate } from "@/app/hooks/useCertificate";
import BaptismCertificateTable from "./components/BaptismCertificateTable";

function Certicates() {
  const { data, isLoading } = useGetReqCertificate();

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
