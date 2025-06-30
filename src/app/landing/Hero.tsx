"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

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
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Hero() {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-6 flex flex-col items-center gap-12 text-center">
        {/* Title & Description */}
        <motion.div
          className="flex flex-col justify-center items-center space-y-6"
          initial="hidden"
          animate="show"
        >
          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl"
              variants={fadeUp}
              custom={1}
            >
              <span className="text-red-900">CANA</span>{" "}
              <span className="text-amber-500">Circuit</span>
            </motion.h1>
            <motion.p
              className="text-xl text-red-600 font-semibold italic"
              variants={fadeUp}
              custom={2}
            >
              "Turning Water Into Wine"
            </motion.p>
            <motion.p
              className="max-w-[600px] text-gray-600 md:text-md text-sm"
              variants={fadeUp}
              custom={3}
            >
              Join us in our spiritual journey as we transform lives through
              faith, fellowship, and the power of God's word. Experience the
              miracle of transformation in your own life.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col mt-5 gap-3 min-[400px]:flex-row justify-center"
            variants={fadeUp}
            custom={4}
          >
            <Link href="/applications">
              <Button className="bg-red-900 cursor-pointer hover:bg-red-800 text-white px-6 py-2.5 text-base font-semibold shadow-red-700 shadow-md hover:shadow-lg hover:shadow-red-600 drop-shadow-[0_0_6px_#7f1d1d] transition-all duration-300 animate-pulse">
                Join Our Circuit
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Location Tags */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center pt-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {locations.map((location) => (
            <motion.span
              key={location}
              variants={itemVariants}
              className="px-3 py-1 bg-red-100 text-red-700 text-[10px] md:text-sm font-medium rounded-full border border-red-200 hover:bg-red-200 transition-colors duration-200"
            >
              {location}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
