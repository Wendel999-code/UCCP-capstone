"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

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

function MarqueeRow({ reverse = false, speed = 30 }) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    });
  }, [controls, reverse, speed]);

  return (
    <motion.div
      className="flex gap-6 w-max"
      animate={controls}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          },
        })
      }
    >
      {[...testimonials, ...testimonials].map((t, idx) => (
        <Card
          key={idx}
          className="
    w-60  sm:w-72 md:w-80 
    flex-shrink-0 
    border border-amber-200 dark:border-amber-700 
    bg-white dark:bg-neutral-900
  "
        >
          <CardContent className="p-2 sm:p-4">
            <div className="flex gap-3 sm:gap-4 items-center mb-2 sm:mb-3">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-amber-500 shadow">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-red-900 dark:text-amber-500 text-sm sm:text-base">
                  {t.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {t.memberSince}
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 italic text-xs sm:text-sm">
              "{t.message}"
            </p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 bg-yellow-50 dark:bg-neutral-950 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-red-900 dark:text-amber-500">
            Testimonials
          </h2>
          <p className="mt-3 text-gray-700 dark:text-gray-300 md:text-lg">
            Hear from our church family
          </p>
        </div>

        <div className="space-y-8">
          <MarqueeRow reverse={false} speed={40} />{" "}
          {/* Top row: left to right */}
          <MarqueeRow reverse={true} speed={40} />{" "}
          {/* Bottom row: right to left */}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
