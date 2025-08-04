"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Testimonial } from "@/global/type";
import { motion, useAnimationControls } from "framer-motion";
import { Pause, Play, Quote, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetTestimonial } from "../hooks/testimonial";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="w-72 sm:w-80 md:w-96 flex-shrink-0 border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white dark:bg-gray-800/50 backdrop-blur-sm group overflow-hidden relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-orange-50/30 dark:from-amber-900/10 dark:via-transparent dark:to-orange-900/5"></div>

      {/* Quote decoration */}
      <div className="absolute top-4 right-4 text-amber-200 dark:text-amber-800/30">
        <Quote className="h-8 w-8 transform rotate-12" />
      </div>

      <CardContent className="p-6 relative z-10">
        {/* Star rating */}
        {/* <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div> */}

        {/* Testimonial text */}
        <blockquote className="text-gray-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed mb-6 line-clamp-4 italic font-medium">
          "{testimonial.description}"
        </blockquote>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden ring-2 ring-amber-400/50 shadow-md group-hover:ring-amber-400 transition-all duration-300">
              <Image
                src="/logo1.jpg"
                alt={testimonial.fullName ?? "Testimonial"}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
          </div>

          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-amber-400 text-sm sm:text-base">
              {testimonial.fullName}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Church Member
              </span>
              {/* <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Since 2020
              </span> */}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </CardContent>
    </Card>
  );
}

function MarqueeRow({
  reverse,
  speed,
  testimonials,
  isPlaying,
  setIsPlaying,
}: {
  reverse: boolean;
  speed: number;
  testimonials: Testimonial[];
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (isPlaying) {
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
    } else {
      controls.stop();
    }
  }, [controls, reverse, speed, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative group">
      <motion.div
        className="flex gap-6 w-max"
        animate={controls}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        {/* Duplicate testimonials for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, idx) => (
          <TestimonialCard
            key={`${testimonial.id || idx}-${idx}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>

      {/* Play/Pause control */}
      <button
        onClick={handlePlayPause}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
        aria-label={isPlaying ? "Pause testimonials" : "Play testimonials"}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        ) : (
          <Play className="h-4 w-4 text-gray-700 dark:text-gray-300" />
        )}
      </button>
    </div>
  );
}

function Testimonials() {
  const { data: testimonials, isLoading } = useGetTestimonial();

  const [isPlaying, setIsPlaying] = useState(true);

  // Mock data fallback for development
  const mockTestimonials = [
    {
      id: "1",
      fullName: "Maria Santos",
      description:
        "CANA Circuit has been a blessing to our family. The community here is so welcoming and the spiritual growth I've experienced has been incredible.",
    },
    {
      id: "2",
      fullName: "John Rivera",
      description:
        "The youth programs and community outreach have made such a positive impact. I'm grateful to be part of this amazing church family.",
    },
    {
      id: "3",
      fullName: "Grace Mendoza",
      description:
        "From the moment we walked in, we felt at home. The worship services are inspiring and the fellowship is genuine and heartwarming.",
    },
    // Add more mock testimonials as needed
  ];

  const displayTestimonials = testimonials?.length
    ? testimonials
    : mockTestimonials;

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(251,191,36,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(251,146,60,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_75%_75%,rgba(251,146,60,0.05),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-800 dark:text-amber-300 text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>What Our Community Says</span>
            <Star className="h-4 w-4 fill-current" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hearts
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent ml-3">
              Transformed
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover how CANA Circuit has touched lives and strengthened faith
            in our community since 1948
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                500+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Happy Members
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                75+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Years of Service
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                5★
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Community Rating
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced marquee section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <MarqueeRow
            reverse={false}
            speed={100}
            testimonials={displayTestimonials}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
          <MarqueeRow
            reverse={true}
            speed={100}
            testimonials={displayTestimonials}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg">
            <span className="text-gray-600 dark:text-gray-300">
              Want to share your story?
            </span>
            <Link href={"/applications"}>
              <button className="px-4 py-2 bg-gradient-to-r cursor-pointer from-amber-400 to-yellow-500 text-white rounded-full font-medium hover:from-amber-500 hover:to-yellow-600 transition-all duration-300 hover:scale-105 shadow-md">
                Join Our Family
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;
