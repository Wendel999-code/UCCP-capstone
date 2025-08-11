"use client";

import { motion, useInView } from "framer-motion";
import { MapPin, Navigation, Globe } from "lucide-react";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Location data with coordinates for the diagonal line layout - only names
const locations = [
    { name: "Cabacungan", x: 15, y: 12 },
    { name: "Lipata", x: 20, y: 15 },
    { name: "Allen", x: 25, y: 20 },
    { name: "Victoria", x: 30, y: 25 },
    { name: "San Isidro", x: 35, y: 30 },
    { name: "Alegria", x: 45, y: 40 },
    { name: "Salvacion", x: 60, y: 60 },
    { name: "San Juan", x: 69, y: 68 },
    { name: "Palanit", x: 75, y: 85 },
  ];
  
  

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const pinVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.15,
    y: -6,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  tap: { scale: 0.95 },
};

function Locations() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.08),transparent_50%)] dark:opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.06),transparent_50%)] dark:opacity-30"></div>

      {/* Smooth transition from above section */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-50 dark:to-gray-900"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Circuit Locations
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our vibrant communities across the region, each serving as a beacon of faith and fellowship
            </p>
          </motion.div>

          {/* Interactive Diagonal Map Container */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative mx-auto max-w-6xl">
              {/* Map Canvas */}
              <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-800/20 rounded-3xl border-2 border-blue-200/60 dark:border-blue-700/40 shadow-2xl overflow-hidden">
                
                {/* Map Texture Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.4),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.1),transparent_50%)]"></div>
                
                {/* Subtle Grid Lines */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}></div>
                </div>

                {/* Diagonal Zigzag Connection Line */}
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 140 140" preserveAspectRatio="none">
                  <path
                    d="M10,10 L25,25 L40,40 L55,55 L70,70 L85,85 L100,100 L115,115 L130,130"
                    stroke="url(#diagonalZigzagGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                  />
                  <defs>
                    <linearGradient id="diagonalZigzagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central Header - Northern Samar Philippines */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-700 dark:text-blue-300 bg-white/95 dark:bg-gray-800/95 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg border border-blue-200/60 dark:border-blue-700/40">
                  Northern Samar Philippines
                </div>

                {/* Location Pins */}
                <TooltipProvider>
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      variants={pinVariants}
                      custom={index}
                      whileHover="hover"
                      whileTap="tap"
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            {/* Pin Shadow */}
                            <div className="absolute inset-0 w-8 h-8 bg-black/20 rounded-full blur-sm transform translate-y-1"></div>
                            
                            {/* Pin Body */}
                            <div className="relative w-8 h-8 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full shadow-lg border-2 border-white dark:border-gray-800 transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-amber-500/50">
                              <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>

                            {/* Pulse Animation */}
                            <motion.div
                              animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.4, 0, 0.4],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.3,
                              }}
                              className="absolute inset-0 w-8 h-8 bg-amber-400 rounded-full"
                            />

                            {/* Hover Glow Effect */}
                            <motion.div
                              initial={{ opacity: 0, scale: 1 }}
                              whileHover={{ opacity: 1, scale: 1.5 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 w-8 h-8 bg-amber-400/30 rounded-full blur-md"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="top" 
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-xl"
                        >
                          <div className="text-center space-y-1">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                              {location.name}
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          </motion.div>

          {/* Mobile Responsive Location List */}
          <motion.div variants={itemVariants} className="lg:hidden">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                Our Communities
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {locations.map((location, index) => (
                  <motion.div
                    key={location.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl px-3 py-3 border border-gray-200/60 dark:border-gray-600/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight">
                        {location.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced Mobile Map with Diagonal Layout */}
          <motion.div variants={itemVariants} className="lg:hidden">
            <div className="max-w-full mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
                Interactive Map View
              </h3>
              <div className="overflow-auto pb-4 scrollbar-hide">
                <div className="w-[600px] h-[600px] bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-blue-800/20 rounded-2xl border-2 border-blue-200/60 dark:border-blue-700/40 shadow-xl relative">
                  {/* Mobile Map Content */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.4),transparent_50%)] dark:bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.1),transparent_50%)] rounded-2xl"></div>
                  
                  {/* Mobile Diagonal Zigzag Connection Line */}
                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 140 140" preserveAspectRatio="none">
                    <path
                      d="M10,10 L25,25 L40,40 L55,55 L70,70 L85,85 L100,100 L115,115 L130,130"
                      stroke="url(#mobileDiagonalZigzagGradient)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="5,5"
                    />
                    <defs>
                      <linearGradient id="mobileDiagonalZigzagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Mobile Location Pins */}
                  <TooltipProvider>
                    {locations.map((location, index) => (
                      <motion.div
                        key={location.name}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        className="absolute group cursor-pointer"
                        style={{
                          left: `${location.x}%`,
                          top: `${location.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative">
                              <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg border-2 border-white dark:border-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <MapPin className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-xl"
                          >
                            <div className="text-center space-y-1">
                              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {location.name}
                              </p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                ← Scroll to explore all locations →
              </p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 text-amber-600 dark:text-amber-400">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Explore Our Circuit</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Each location represents a community of faith, united in purpose and dedicated to serving God and our neighbors. 
              Join us in building stronger communities through spiritual growth and fellowship.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              <span>{locations.length} vibrant communities</span>
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Locations;
