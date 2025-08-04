"use client";

import { motion, useInView } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Church,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "backOut" },
  },
};

function About() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });
  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.3,
  });

  const stats = [
    {
      icon: Calendar,
      label: "Established",
      value: "1948",
      color: "text-blue-500",
    },
    { icon: Users, label: "Members", value: "500+", color: "text-green-500" },
    {
      icon: Church,
      label: "Ministries",
      value: "12+",
      color: "text-purple-500",
    },
    { icon: Heart, label: "Communities", value: "4", color: "text-red-500" },
  ];

  const milestones = [
    { year: "1898", event: "American Protestant missions planning begins" },
    { year: "1948", event: "UCCP formally organized on May 25th" },
    { year: "Present", event: "Continuing faithful service to the community" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-slate-50 via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.1),transparent_40%)] dark:opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(249,115,22,0.08),transparent_40%)] dark:opacity-30"></div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 opacity-20 dark:opacity-10"
      >
        <Sparkles className="h-24 w-24 text-amber-400" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-800 dark:text-amber-300 text-sm font-medium mb-6"
          >
            <Award className="h-4 w-4" />
            <span>Our Story Since 1948</span>
            <Award className="h-4 w-4" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6"
          >
            About Our
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent ml-3">
              Church
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the rich heritage and vibrant community that has been
            transforming lives and strengthening faith for over 75 years
          </motion.p>
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Main Content */}
            <motion.div layout className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 dark:border-amber-800/30"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Our Foundation
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The United Church of Christ in the Philippines (UCCP) is a
                  mainline Protestant denomination that traces its origins to
                  the 1898 meeting of American Protestant mission boards in New
                  York, which planned cooperative missionary work in the
                  newly-acquired Philippines.
                </p>
              </motion.div>

              <motion.div
                key="expanded-section"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 dark:border-amber-800/30"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Our Unity
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    It was formally organized on May 25, 1948, from the union of
                    several Protestant denominations, including the Evangelical
                    Church of the Philippines, the Philippine Methodist Church,
                    the Disciples of Christ, the United Evangelical Church, and
                    several independent congregations.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-amber-200/50 dark:border-amber-800/30"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Our Faith
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    The UCCP's traditions are rooted in the Protestant
                    Reformation, emphasizing the "Five Solas" and the primacy of
                    Scripture in matters of faith, doctrine, and morals.
                  </p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  variants={itemVariants}
                  className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800/30"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-600" />
                    Key Milestones
                  </h3>
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-16 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {milestone.year === "Present"
                            ? "Now"
                            : milestone.year}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 pt-1">
                          {milestone.event}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Expand/Collapse Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            ></motion.div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center lg:items-end space-y-8"
          >
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative w-72 sm:w-80 md:w-96 lg:w-[400px] xl:w-[450px]">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                  <Image
                    src="/logo1.jpg"
                    alt="CANA Circuit Church"
                    width={450}
                    height={450}
                    priority
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-4 py-2 rounded-full shadow-lg font-bold text-sm"
                >
                  Since 1948
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              ref={statsRef}
              variants={containerVariants}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              className="grid grid-cols-2 gap-4 w-full max-w-md"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center group hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700/50 mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
