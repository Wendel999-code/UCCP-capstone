"use client";

import { useGetReqCertificateByID } from "@/app/hooks/useCertificate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { GeneratedCertificate } from "@/lib/supabase/actions/certificate";
import { getAgeAtBaptism } from "@/lib/utils/dateHelper";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import domtoimage from "dom-to-image-more";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface CertMemberModalProps {
  openCertPreview: boolean;
  setOpenCertPreview: (value: boolean) => void;
  reqID: string;
  member_id: string;
}

const CertificatePreview = ({
  reqID,
  member_id,
  openCertPreview,
  setOpenCertPreview,
}: CertMemberModalProps) => {
  const { data, isLoading } = useGetReqCertificateByID(
    reqID,
    member_id,
    openCertPreview
  );

  const queryClient = useQueryClient();

  const [isCapturing, setIsCapturing] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const baptizedDate = data?.baptism_date
    ? format(new Date(data.baptism_date), "MMMM d, yyyy")
    : "N/A";

  const birthDate = data?.date_of_birth
    ? format(new Date(data.date_of_birth), "MMMM d, yyyy")
    : "N/A";

  const ageAtBaptism =
    data?.date_of_birth && data?.baptism_date
      ? getAgeAtBaptism(data.date_of_birth, data.baptism_date)
      : "N/A";

  const handleDownload = async () => {
    if (!certRef.current || !data) return;
    setIsCapturing(true);
    try {
      const dataUrl = await domtoimage.toPng(certRef.current, {
        quality: 1,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${data.lastName}_${data.firstName}_Baptism_Certificate.png`;
      link.href = dataUrl;
      link.click();
      await GeneratedCertificate(reqID);
      queryClient.invalidateQueries({ queryKey: ["req-certificate"] });
      setOpenCertPreview(false);
      toast.success("Sent email to recipient.");
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <Dialog open={openCertPreview} onOpenChange={setOpenCertPreview}>
      <DialogContent
        className="
          p-4
          w-full
          max-w-[720px]
          bg-white
          border border-neutral-300
          rounded-lg
          shadow-lg
          text-black
          overflow-auto
        "
      >
        <div
          ref={certRef}
          className="
            bg-white
            p-6
            rounded-md
            h-[600px]
            w-full
            aspect-[0.707]
            flex flex-col justify-between
            border border-neutral-200
            shadow
          "
          style={{ aspectRatio: "1 / 1.414" }}
        >
          <DialogHeader className="text-center mb-4">
            <DialogTitle className="text-sm text-center  font-serif font-bold uppercase text-neutral-800">
              United Church of Christ in the Philippines
            </DialogTitle>
            <div className="flex justify-center mt-2">
              <img
                src="/uccp.jpg"
                alt="UCCP Logo"
                className="w-16 h-16 object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <p className="text-2xl text-center font-bold font-serif mt-2">
              Certificate of Baptism
            </p>
            <DialogDescription className="text-sm  text-center italic text-neutral-700 mt-1">
              This certifies that
            </DialogDescription>

            {isLoading ? (
              <div className="space-y-2 text-center mt-4">
                <Skeleton className="h-6 w-48 mx-auto" />
                <Skeleton className="h-4 w-64 mx-auto" />
                <Skeleton className="h-4 w-52 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
                <Skeleton className="h-4 w-72 mx-auto" />
                <Skeleton className="h-4 w-80 mx-auto" />
                <div className="flex justify-between px-10 mt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            ) : data ? (
              <div className="flex flex-col text-black text-center justify-center mt-4 space-y-2">
                <h1 className="text-xl underline font-bold">
                  {data.firstName} {data.lastName}
                </h1>
                <p>
                  {data.gender}, child of{" "}
                  <span className="underline font-semibold">
                    {data.father_fn}
                  </span>{" "}
                  and{" "}
                  <span className="underline font-semibold">
                    {data.mother_fn}
                  </span>
                </p>
                <p>
                  Born on <span className="underline">{birthDate}</span>, was
                  baptized
                </p>
                <p>
                  at the age of <span>{ageAtBaptism}</span>.
                </p>
                <p className="mt-2 text-[14px]">
                  According to the baptismal rites of the UNITED CHURCH OF
                  CHRIST IN THE PHILIPPINES, in the name of GOD, FATHER, SON,
                  AND HOLY SPIRIT.
                </p>
                <p className="mt-2 text-[14px]">
                  Baptized on {baptizedDate} at the UNITED CHURCH OF CHRIST IN
                  THE PHILIPPINES,
                  {""} {data.circuit} local church, province of Northern Samar,
                  Philippines.
                </p>
                <div className="flex justify-between gap-4 text-sm mt-8 px-4">
                  <div>
                    <p className="underline">{data.officiant}</p>
                    Officiating Minister
                  </div>
                  <div>
                    <p className="underline">{data.circuit}</p>
                    Local Church
                  </div>
                  {/* <div>
                    <p className="underline"> </p>
                    Church Secretary
                  </div> */}
                </div>
              </div>
            ) : (
              <h1 className="text-xl mt-4 text-red-500">Member not found</h1>
            )}
          </DialogHeader>
        </div>
        <DialogFooter>
          <Button
            onClick={handleDownload}
            disabled={isLoading || !data || isCapturing}
            className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-red-900 font-medium w-full max-w-xs mx-auto flex items-center justify-center gap-2"
          >
            {isCapturing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Preparing...
              </>
            ) : (
              "Download Certificate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CertificatePreview;
