"use client";

import { Calendar, Clock } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

function Services() {
  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-yellow-50">
      <motion.div
        className="container px-4 md:px-12 md:ml-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div
          className="text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-yellow-800">
            Our Services
          </h2>
          <p className="mt-4 text-gray-700 md:text-lg">
            Join us in worship and fellowship throughout the week
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {[
            {
              title: "Sunday Worship",
              description:
                "Experience uplifting worship, inspiring messages, and a welcoming community.",
              time: "9:00 AM & 11:00 AM",
            },
            {
              title: "Wednesday Bible Study",
              description:
                "Dive deeper into scripture and strengthen your faith through group discussion.",
              time: "7:00 PM",
            },
            {
              title: "Youth Group",
              description:
                "A safe and fun environment for young people to grow in faith and friendship.",
              time: "Friday, 6:00 PM",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm md:ml-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-yellow-500" />
                <h3 className="text-xl font-bold">{service.title}</h3>
              </div>
              <p className="text-gray-700">{service.description}</p>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                <span>{service.time}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Services;
