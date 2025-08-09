"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CertificatePreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="
      bg-white
      p-6
      rounded-xl
      w-full
      max-w-[500px]
      flex flex-col justify-between
      border-2 border-amber-200
      shadow-2xl
      relative
      overflow-hidden
      sm:aspect-[0.707] sm:h-[600px]
      h-auto
    "
    
      style={{ aspectRatio: "1 / 1.414" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/20"></div>

      {/* Certificate content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-sm text-center font-serif font-bold uppercase text-neutral-800 mb-2">
            United Church of Christ in the Philippines
          </h1>

          <div className="flex justify-center mb-2">
            <div className="relative">
              <Image
                src="/uccp.jpg"
                alt="UCCP Logo"
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <h2 className="text-2xl text-center font-bold font-serif text-amber-800 mb-2">
            Certificate of Baptism
          </h2>

          <p className="text-sm text-center italic text-neutral-700">
            This certifies that
          </p>
        </div>

        {/* Sample content */}
        <div className="flex flex-col text-black text-center justify-center flex-1 space-y-3">
          <h3 className="text-xl underline font-bold text-amber-900">
            [Your Name Here]
          </h3>

          <p className="text-sm">
            Child of{" "}
            <span className="underline font-semibold">[Father's Name]</span> and{" "}
            <span className="underline font-semibold">[Mother's Name]</span>
          </p>

          <p className="text-sm">
            Born on <span className="underline">[Date of Birth]</span>, was
            baptized
          </p>

          <p className="text-sm">
            at the age of <span className="font-semibold">[Age]</span>.
          </p>

          <p className="mt-4 text-xs text-neutral-600 leading-relaxed">
            According to the baptismal rites of the UNITED CHURCH OF CHRIST IN
            THE PHILIPPINES, in the name of GOD, FATHER, SON, AND HOLY SPIRIT.
          </p>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Baptized on [Baptism Date] at the UNITED CHURCH OF CHRIST IN THE
            PHILIPPINES, [Church Name] local church, province of Northern Samar,
            Philippines.
          </p>

          {/* Footer signatures */}
          <div className="flex justify-between gap-4 text-xs mt-6 px-4">
            <div>
              <p className="underline font-semibold">[Minister Name]</p>
              <p className="text-neutral-600">Officiating Minister</p>
            </div>
            <div>
              <p className="underline font-semibold">[Church Name]</p>
              <p className="text-neutral-600">Local Church</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative border */}
      <div className="absolute inset-0 border-2 border-amber-300/50 rounded-xl pointer-events-none"></div>

      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-amber-400 rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-amber-400 rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-amber-400 rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-amber-400 rounded-br-lg"></div>
    </motion.div>
  );
};

export default CertificatePreview;
