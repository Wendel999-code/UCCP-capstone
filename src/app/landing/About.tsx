"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const imageUrls = [
  "https://cdn.pixabay.com/photo/2021/12/15/07/29/saint-isaac-cathedral-6871954_640.jpg",
  "https://cdn.pixabay.com/photo/2020/10/13/18/33/architecture-5652562_960_720.jpg",
  "https://cdn.pixabay.com/photo/2022/05/23/18/30/church-7216926_960_720.jpg",
  "https://cdn.pixabay.com/photo/2017/11/07/18/42/religion-2927802_640.jpg",
];

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
    transition: { duration: 0.5 },
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
          {/* Left Column: */}
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
            <motion.div variants={itemVariants} className="flex pt-4">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Our History
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: */}
          <div className="grid grid-cols-2 gap-4">
            {imageUrls.map((url, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.3 },
                  },
                }}
                className="relative w-full h-48 md:h-56 lg:h-52 rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  src={url}
                  alt={`Church image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
