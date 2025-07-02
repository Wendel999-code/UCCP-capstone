"use client";

import { useGetReqCertificateByID } from "@/app/hooks/useCertificate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface CertMemberModalProps {
  openCertPreview: boolean;
  setOpenCertPreview: (value: boolean) => void;
  reqID: string;
}

const CertificatePreview = ({
  reqID,
  openCertPreview,
  setOpenCertPreview,
}: CertMemberModalProps) => {
  const { data, isLoading, error } = useGetReqCertificateByID(
    reqID,
    openCertPreview
  );
  return (
    <Dialog open={openCertPreview} onOpenChange={setOpenCertPreview}>
      <DialogContent className="max-w-[900px] w-full p-12 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-xl">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-3xl font-serif font-bold uppercase text-neutral-800 dark:text-neutral-100">
            United Church of Christ in the Philippines
          </DialogTitle>
          <div className="flex justify-center mt-2">
            <Image src="/uccp.jpg" alt="UCCP Logo" width={80} height={80} />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-serif">
              Certificate of Baptism
            </p>
          </div>
          <DialogDescription className="text-base italic text-neutral-700 dark:text-neutral-300">
            This certifies the following information
          </DialogDescription>
        </DialogHeader>

        <div className="text-neutral-800 dark:text-neutral-100 font-serif space-y-6 text-center text-lg">
          {isLoading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-600 dark:text-red-400">
              {error.message}
            </p>
          )}
          {data && (
            <div className="space-y-5">
              <p>
                This certifies that{" "}
                <span className="underline font-bold text-xl">
                  {data.firstName} {data.lastName}
                </span>
              </p>
              <p>
                Child of <span className="underline">{data.father_fn}</span> and{" "}
                <span className="underline">{data.mother_fn}</span>
              </p>
              <p>
                Born on <span className="underline">{data.date_of_birth}</span>,
                baptized on{" "}
                <span className="underline">{data.baptism_date}</span>
              </p>
              <p>
                at <span className="underline">{data.circuit}</span>
              </p>

              <div className="flex justify-between mt-12 px-12">
                <div className="text-left">
                  <p className="font-bold">Officiating Minister</p>
                  <p className="mt-3 underline">{data.officiant}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Certified Correct</p>
                  <p className="mt-3 underline">Church Secretary</p>
                </div>
              </div>

              <div className="border-t border-neutral-300 dark:border-neutral-600 mt-12 pt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
                <p>United Church of Christ in the Philippines</p>
                <p className="italic">
                  In the name of God: Father, Son, and Holy Spirit
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
