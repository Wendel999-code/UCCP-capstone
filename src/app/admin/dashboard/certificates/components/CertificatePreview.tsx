"use client";

import { useGetReqCertificateByID } from "@/app/hooks/useCertificate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getAgeAtBaptism } from "@/utils/dateHelper";
import { format } from "date-fns";
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
  const { data, isLoading } = useGetReqCertificateByID(reqID, openCertPreview);

  const baptizedDate = data?.baptism_date
    ? format(new Date(data.date_of_birth), "MMMM d, yyyy")
    : "N/A";

  const birthDate = data?.date_of_birth
    ? format(new Date(data.date_of_birth), "MMMM d, yyyy")
    : "N/A";

  const ageAtBaptism =
    data?.date_of_birth && data?.baptism_date
      ? getAgeAtBaptism(data.date_of_birth, data.baptism_date)
      : "N/A";

  return (
    <Dialog open={openCertPreview} onOpenChange={setOpenCertPreview}>
      <DialogContent
        className="
      p-10
      w-full
      max-w-5xl
      bg-white
      border border-neutral-300
      rounded-lg
      shadow-lg
      text-black
    "
      >
        <DialogHeader className="text-center mb-6">
          <div className="flex justify-center w-full">
            {" "}
            <DialogTitle className="text-sm ml-4 w-full font-serif font-bold uppercase text-neutral-800">
              United Church of Christ in the Philippines
            </DialogTitle>
          </div>
          <div className="flex justify-center mt-4">
            <Image src="/uccp.jpg" alt="UCCP Logo" width={60} height={60} />
          </div>
          <div className="mt-4 ">
            <p className="text-3xl text-center text-black font-bold font-serif">
              Certificate of Baptism
            </p>
          </div>
          <DialogDescription className=" text-sm text-center italic text-neutral-700 mt-2">
            This certifies that
          </DialogDescription>
          {isLoading ? (
            <div className="space-y-4 text-center">
              <Skeleton className="h-6 w-48 mx-auto" />
              <Skeleton className="h-4 w-72 mx-auto" />
              <Skeleton className="h-4 w-60 mx-auto" />
              <Skeleton className="h-4 w-40 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
              <Skeleton className="h-4 w-96 mx-auto" />
              <div className="flex justify-between px-10 mt-8">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          ) : data ? (
            <div className="flex flex-col text-black text-center justify-center">
              <div>
                <h1 className="text-xl underline font-bold">
                  {data?.firstName} {data?.lastName}
                </h1>
              </div>
              <div>
                <p>
                  {data?.gender}, child of{" "}
                  <span className="underline font-semibold ">
                    {data?.father_fn}
                  </span>{" "}
                  and{" "}
                  <span className="underline font-semibold">
                    {data?.mother_fn}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  Born on <span className="underline">{birthDate}</span>, was
                  baptized
                </p>
              </div>
              <div>
                <p>
                  at the age of <span>{ageAtBaptism}</span> yr. old
                </p>
              </div>
              <div className="mt-4 text-sm">
                <p>
                  according to the baptismal rites of the UNITED CHURCH OF
                  CHRIST IN THE PHILIPPINES, in the name of GOD, FATHER, SON,
                  AND HOLY SPIRIT.
                </p>
              </div>
              <div className="mt-2 text-sm">
                <p> Baptized this on {baptizedDate} </p> at the UNITED CHURCH OF
                CHRIST IN THE PHILIPPINES, {data?.circuit} local church,
                province of Northern Samar of the Northern - Western Samar
                conference, Philippines.
              </div>
              <div className="flex justify-between gap-7 text-sm mt-12">
                <div>
                  <p className="underline">{data?.officiant}</p>
                  Officiating Minister
                </div>
                <div>
                  <p className="underline">{data?.circuit}</p>
                  Local Church
                </div>
                <div>
                  <p className="underline"> </p>
                  Church Secretary
                </div>
              </div>
            </div>
          ) : null}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
