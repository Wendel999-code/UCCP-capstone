"use client";

import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import Image from "next/image";
import { useRef } from "react";

interface CertificatePreviewProps {
  userData: {
    firstName: string;
    lastName: string;
    date_of_birth: string;
    churchName?: string;
  };
}

export default function CertificatePreview({
  userData,
}: CertificatePreviewProps) {
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      useCORS: true,
      scale: 2,
    });
    const link = document.createElement("a");
    link.download = `${userData.firstName}-${userData.lastName}-certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center p-6 text-gray-500 dark:text-gray-400">
        No user data provided.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div
        ref={certRef}
        className="relative w-[350px] sm:w-[500px] md:w-[700px] lg:w-[800px] aspect-[4/3] mx-auto shadow-lg rounded-md overflow-hidden bg-white dark:bg-neutral-800"
      >
        {/* Background template */}
        <Image
          src="/cert.png"
          alt="Certificate Template"
          height={400}
          width={400}
          className="object-cover h-auto w-auto "
        />

        {/* Overlay user data */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-red-900 dark:text-amber-500 drop-shadow">
            Certificate of Baptism
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            This certifies that
          </p>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl font-semibold text-red-800 dark:text-amber-400">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            born on {new Date(userData.date_of_birth).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
            was baptized at {userData.churchName}
          </p>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="bg-amber-700 hover:bg-amber-600 text-white"
      >
        Download Certificate
      </Button>
    </div>
  );
}
