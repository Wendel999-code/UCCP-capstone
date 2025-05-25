"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function WelcomeMessage() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-yellow-50">
      <motion.div
        className="container px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="text-center md:pl-32 flex flex-col items-center justify-center max-w-[800px] mx-auto space-y-4">
          <motion.h2
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-yellow-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Our Mission
          </motion.h2>

          <motion.p
            className="text-gray-700 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            We’re devoted to inspiring hope, sharing love, and nurturing faith.
            Our goal is to foster a warm and inclusive space where all are
            welcome to discover and grow in God’s grace.
          </motion.p>

          <motion.div
            className="flex justify-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <Button className="bg-yellow-500 hover:bg-yellow-600 ">
              About Our Church <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default WelcomeMessage;
