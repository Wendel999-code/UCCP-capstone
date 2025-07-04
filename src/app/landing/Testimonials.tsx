"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { useGetTestimonial } from "../hooks/testimonial";

function MarqueeRow({ reverse = false, speed = 30 }) {
  const { data: testimonials, isLoading } = useGetTestimonial();

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
      {testimonials?.map((t, idx) => (
        <Card
          key={idx}
          className="
    w-60  sm:w-72 md:w-80 
    flex-shrink-0 
    border border-amber-200 dark:border-amber-700 
    bg-white dark:bg-neutral-900
  "
        >
          <CardContent className="p-2 ">
            <div className="flex gap-3 sm:gap-4 items-center mb-2 ">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-amber-500 shadow">
                <Image
                  src={"/logo1.jpg"}
                  alt={t.fullName ?? "Testimonial"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className=" text-red-900 dark:text-amber-500 text-[12px]">
                  {t.fullName}
                </h4>
                {/* <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {t.memberSince}
                </p> */}
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-4 italic text-xs sm:text-sm">
              "{t.description}"
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
