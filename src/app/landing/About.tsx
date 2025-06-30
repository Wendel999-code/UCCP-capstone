"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
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
    once: true,
    amount: 0.3,
  });

  return (
    <section
      id="about"
      className="py-16 px-4 md:px-8 lg:px-16 bg-background"
      ref={sectionRef}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold tracking-tight text-red-900 dark:text-amber-500"
            >
              About Our Church
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed"
            >
              Founded in 1985,{" "}
              <span className="font-semibold text-red-800 dark:text-amber-500">
                Grace Church
              </span>{" "}
              has been a pillar of spiritual guidance and community support for
              over three decades. Our congregation has grown from a small group
              of dedicated believers to a thriving community of faith.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 dark:text-gray-300 md:text-lg leading-relaxed"
            >
              We are committed to serving our community through various outreach
              programs, educational initiatives, and spiritual guidance. Our
              doors are always open to those seeking connection, purpose, and
              spiritual growth.
            </motion.p>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div variants={itemVariants}>
            <Image
              src="/uccp.jpg"
              alt="Grace Church"
              width={350}
              height={350}
              priority
              className="ml-10 dark:rounded-md hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
