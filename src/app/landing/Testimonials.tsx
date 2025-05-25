"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah J.",
    memberSince: "Member since 2018",
    image:
      "https://cdn.pixabay.com/photo/2023/01/16/08/47/history-7721906_1280.jpg",
    message:
      "Finding Grace Church was a blessing. The community is welcoming, and I've grown so much in my faith journey here.",
  },
  {
    name: "Michael T.",
    memberSince: "Member since 2015",
    image:
      "https://media.istockphoto.com/id/1267497795/photo/young-woman-in-spiritual-pose-holding-the-light.jpg?s=1024x1024&w=is&k=20&c=dyE7IduoTyP0dpZ3NlEMFmJJFR2t6YgzUGR2e3qWVHE=",
    message:
      "The youth program at Grace Church has been transformative for my children. They look forward to church every week!",
  },
  {
    name: "Rebecca L.",
    memberSince: "Member since 2020",
    image:
      "https://cdn.pixabay.com/photo/2017/03/02/20/25/woman-2112292_960_720.jpg",
    message:
      "After moving to the area, I was looking for a spiritual home. Grace Church welcomed me with open arms and has become my family.",
  },
  {
    name: "David M.",
    memberSince: "Member since 2017",
    image:
      "https://cdn.pixabay.com/photo/2021/06/13/12/44/man-6332394_960_720.jpg",
    message:
      "Grace Church has been a cornerstone in my spiritual life. The teachings and worship sessions are deeply impactful.",
  },
  {
    name: "Linda A.",
    memberSince: "Member since 2019",
    image:
      "https://cdn.pixabay.com/photo/2017/08/06/22/01/woman-2593366_960_720.jpg",
    message:
      "I found lifelong friendships here. The women’s ministry has empowered me and helped me grow in faith.",
  },
  {
    name: "John D.",
    memberSince: "Member since 2016",
    image:
      "https://cdn.pixabay.com/photo/2020/06/01/19/44/man-5248251_960_720.jpg",
    message:
      "There’s a genuine sense of belonging. I love volunteering during events — it feels good to give back.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function Testimonials() {
  return (
    <section id="testimonials" className="py-12 md:py-16 lg:py-20 bg-yellow-50">
      <motion.div
        className="container px-4 md:px-6 md:ml-22"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.div
          className="text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-yellow-800">
            Testimonials
          </h2>
          <p className="mt-4 text-gray-700 md:text-lg">
            Hear from our church family
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg border bg-white p-6 shadow-md hover:shadow-lg transition duration-300"
              variants={fadeUp}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden ring-2 ring-yellow-500 shadow-md">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-sm text-gray-600">{t.memberSince}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{t.message}"</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Testimonials;
