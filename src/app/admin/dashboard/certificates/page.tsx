"use client";

import { useGetReqCertificate } from "@/app/hooks/useCertificate";
import { TableSkeleton } from "@/components/TableSkeleton";
import BaptismCertificateTable from "./components/BaptismCertificateTable";

function Certicates() {
  const { data, isLoading } = useGetReqCertificate();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="p-4">
      <BaptismCertificateTable certificates={data || []} />
    </div>
  );
}

export default Certicates;
