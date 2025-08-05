"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export default function LogoLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col min-h-screen justify-center items-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      <div className="absolute -inset-2 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.05),transparent_50%)]" />
      <div className="absolute -inset-2 bg-[radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.03),transparent_50%)]" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full blur-md" />
          <Image
            src="/uccp.jpg"
            alt="CANA Circuit"
            width={80}
            height={80}
            className="relative rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        <motion.h1
          className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl"
          animate={{
            textShadow: [
              "0 0 0px rgba(255,0,0,0.4)",
              "0 0 8px rgba(255,0,0,0.6)",
              "0 0 12px rgba(255,0,0,0.3)",
              "0 0 0px rgba(255,0,0,0.0)",
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <span className="text-red-900">CANA</span>{" "}
          <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Circuit
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-red-600 font-semibold italic"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          "Turning Water Into Wine"
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 opacity-10 dark:opacity-5"
      >
        <Sparkles className="h-32 w-32 text-amber-400" />
      </motion.div>
    </motion.div>
  );
}
