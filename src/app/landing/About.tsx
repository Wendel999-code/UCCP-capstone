"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
  });

  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      className="py-16 px-4 md:px-8 lg:px-16 bg-background"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-tight text-red-900 dark:text-amber-500"
          >
            About Our Church
          </motion.h2>

          {/* Collapsible Text */}
          <motion.div
            layout
            initial={{ height: "auto" }}
            animate={{ height: "auto" }}
            className="overflow-hidden space-y-4"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed"
            >
              The United Church of Christ in the Philippines (UCCP) is a
              mainline Protestant denomination that traces its origins to the
              1898 meeting of American Protestant mission boards in New York,
              which planned cooperative missionary work in the newly-acquired
              Philippines.
            </motion.p>

            <AnimatePresence>
              {expanded && (
                <>
                  <motion.p
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed"
                  >
                    It was formally organized on May 25, 1948, from the union of
                    several Protestant denominations, including the Evangelical
                    Church of the Philippines, the Philippine Methodist Church,
                    the Disciples of Christ, the United Evangelical Church, and
                    several independent congregations.
                  </motion.p>
                  <motion.p
                    variants={itemVariants}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed"
                  >
                    The UCCP's traditions are rooted in the Protestant
                    Reformation, emphasizing the "Five Solas" and the primacy of
                    Scripture in matters of faith, doctrine, and morals.
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="ghost"
              onClick={() => setExpanded((prev) => !prev)}
              className=" border hover:border-yellow-500 cursor-pointer "
            >
              {expanded ? "View Less" : "View More"}
            </Button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            initial={{ opacity: 1, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
            className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72"
          >
            <Image
              src="/logo1.jpg"
              alt="Grace Church"
              width={300}
              height={300}
              priority
              className="rounded-md shadow-md dark:shadow-amber-500/20 w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
