"use client";

import { Button } from "@/components/ui/button";
import Visits from "@/components/Visits";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const locations = [
  "Palanit",
  "San Juan",
  "Salvacion",
  "Alegria",
  "San Isidro",
  "Victoria",
  "Allen",
  "Lipata",
  "Cabacungan",
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 1.2 + i * 0.1,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  }),
};

function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  return (
    <section
      ref={sectionRef}
      className="relative  min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decorations - matching About section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_40%)] dark:opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.08),transparent_40%)] dark:opacity-30"></div>

      {/* Floating elements - matching About section */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 opacity-20 dark:opacity-10"
      >
        <Sparkles className="h-24 w-24 text-amber-400" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 left-10 opacity-15 dark:opacity-8"
      >
        <Sparkles className="h-16 w-16 text-orange-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-12"
        >
          {/* Title & Description */}
          <div className="space-y-8 mt-32">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  CANA{" "}
                </span>
                <span className="relative">
                  Circuit
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-amber-600 dark:text-amber-400 font-medium italic"
              >
                "Turning Water Into Wine"
              </motion.p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Join us in our spiritual journey as we transform lives through
              faith, fellowship, and the power of God's word. Experience the
              miracle of transformation in your own life.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              <Link href="/applications">Join Our Circuit</Link>
            </Button>

            <Visits />
          </motion.div>

          {/* Location Tags with Glow Effect */}
          <motion.div
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto pt-8"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location}
                variants={tagVariants}
                custom={index}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-4 py-1.5 rounded-xl text-white font-medium text-xs md:text-sm bg-red-600 shadow-[0_0_10px_rgba(255,100,100,0.6)] hover:shadow-[0_0_14px_rgba(255,120,120,0.9)] transition-all duration-300 transform  border border-white/10"
              >
                <span className="relative z-10">{location}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
