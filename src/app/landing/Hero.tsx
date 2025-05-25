"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const bibleVerses = [
  {
    text: "“For I know the plans I have for you,” declares the Lord...",
    reference: "Jeremiah 29:11",
  },
  {
    text: "“I can do all things through Christ who strengthens me.”",
    reference: "Philippians 4:13",
  },
  {
    text: "“The Lord is my shepherd, I shall not want.”",
    reference: "Psalm 23:1",
  },
  {
    text: "“Trust in the Lord with all your heart...”",
    reference: "Proverbs 3:5",
  },
];

function Hero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const [currentVerse, setCurrentVerse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % bibleVerses.length);
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 bg-background">
      <div
        className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12"
        ref={sectionRef}
      >
        {/* Left Column: Message and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="flex-1 space-y-12 max-w-xl md:pl-46"
        >
          <h1 className="text-2xl md:text-6xl font-bold leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-yellow-500">Lester Lou's Church</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            To spread love, hope, and faith throughout our community and beyond.
            We believe in creating a welcoming environment where everyone can
            experience God's love.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-lg">
              Join us now
            </Button>
            <Button
              variant="outline"
              className="text-yellow-600 border-yellow-500 hover:bg-yellow-100"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Image with Verse Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-[500px] h-[400px] md:w-[700px] md:h-[500px] rounded-lg overflow-hidden shadow-lg"
        >
          <Image
            src="https://cdn.pixabay.com/photo/2013/07/13/10/20/mystery-157015_960_720.png"
            alt="Church Building"
            fill
            className="object-cover"
            priority
          />

          {/* Bible Verse Overlay */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVerse}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-md p-4 rounded-md shadow-md text-center"
            >
              <p className="text-md md:text-base italic text-gray-900">
                {bibleVerses[currentVerse].text}
              </p>
              <p className="mt-2 text-sm font-medium text-yellow-800">
                — {bibleVerses[currentVerse].reference}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
