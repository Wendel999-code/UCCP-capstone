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
    transition: { duration: 0.3 },
  },
};

function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.3,
  });

  return (
    <section id="about" className="py-12 md:px-46" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold tracking-tighter sm:text-4xl text-yellow-800"
            >
              About Our Church
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 md:text-lg"
            >
              Founded in 1985, Grace Church has been a pillar of spiritual
              guidance and community support for over three decades. Our
              congregation has grown from a small group of dedicated believers
              to a thriving community of faith.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 md:text-lg"
            >
              We are committed to serving our community through various outreach
              programs, educational initiatives, and spiritual guidance. Our
              doors are always open to those seeking connection, purpose, and
              spiritual growth.
            </motion.p>
          </motion.div>

          {/* Right Column: Image */}
          <div className="relative w-full h-80  lg:h-full">
            <Image
              src="/uccp.jpg"
              alt="uccp"
              fill
              className="object-contain rounded-xl  w-auto h-[400px] shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
