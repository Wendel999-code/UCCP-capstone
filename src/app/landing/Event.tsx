"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function Event() {
  return (
    <section id="events" className="py-12 md:py-16 lg:py-20 bg-yellow-50">
      <motion.div
        className="container px-4 md:px-6 md:ml-22"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
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
            Upcoming Events
          </h2>
          <p className="mt-4 text-gray-700 md:text-lg">
            Join us for these special gatherings and celebrations
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.15 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {[
            {
              title: "Community Outreach Day",
              desc: "Join us as we serve our local community through various projects.",
              date: "June 15, 2025",
              time: "9:00 AM - 2:00 PM",
              img: "https://cdn.pixabay.com/photo/2019/11/18/09/07/woman-4634314_640.jpg",
            },
            {
              title: "Summer Bible Camp",
              desc: "A week of fun, learning, and spiritual growth for children ages 5-12.",
              date: "July 10-14, 2025",
              time: "9:00 AM - 3:00 PM",
              img: "https://cdn.pixabay.com/photo/2015/06/09/13/44/world-jamboree-803544_640.jpg",
            },
            {
              title: "Worship & Prayer Night",
              desc: "An evening of worship, prayer, and spiritual renewal.",
              date: "May 28, 2025",
              time: "7:00 PM - 9:00 PM",
              img: "https://cdn.pixabay.com/photo/2019/08/11/20/35/islam-4399868_640.jpg",
            },
          ].map((event, idx) => (
            <motion.div
              key={idx}
              className="group relative overflow-hidden rounded-lg border bg-white"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="relative h-[200px]">
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="mt-2 text-gray-700">{event.desc}</p>
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{event.date}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
            View All Events
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Event;
