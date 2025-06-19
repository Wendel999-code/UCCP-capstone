"use client";

import { motion } from "framer-motion";

export default function LogoLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex space-y-2 flex-col min-h-screen justify-center items-center"
    >
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
        transition={{
          repeat: Infinity,
          duration: 2.5,
          ease: "easeInOut",
        }}
      >
        <span className="text-red-900">CANA</span>{" "}
        <span className="text-amber-500">Circuit</span>
      </motion.h1>

      <motion.p
        className="text-xl text-red-600 font-semibold italic"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        "Turning Water Into Wine"
      </motion.p>
    </motion.div>
  );
}
