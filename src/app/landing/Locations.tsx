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

const locations = [
  {
    name: "Cabacungan",
    x: 10,
    y: 85,
    href: "https://www.google.com/maps/place/Cabacungan,+Allen,+Northern+Samar/@12.5693817,124.2677816,15z/data=!3m1!4b1!4m6!3m5!1s0x33a0b3b7b3a6756b:0xcbcc69ec4a91e685!8m2!3d12.5685175!4d124.2782765!16s%2Fg%2F11fyxbs4qp?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Lipata",
    x: 20,
    y: 87,
    href: "https://www.google.com/maps/dir/12.3200235,124.3449745/Lipata,+Allen,+Northern+Samar/@12.4297464,124.1429566,11z/data=!3m1!4b1!4m18!1m8!3m7!1s0x33a0b31b17efeb3b:0x58525676246bd603!2sLipata,+Allen,+Northern+Samar!3b1!8m2!3d12.5388984!4d124.2782765!16s%2Fg%2F11gbfd3gzf!4m8!1m1!4e1!1m5!1m1!1s0x33a0b31b17efeb3b:0x58525676246bd603!2m2!1d124.2782765!2d12.5388984?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Allen",
    x: 30,
    y: 80,
    href: "https://www.google.com/maps/dir/12.3200235,124.3449745/Allen+Northern+Samar,+Allen,+Northern+Samar/@12.4308132,124.2464458,13z/data=!4m17!1m7!3m6!1s0x33a74d004d8b21bd:0x5b8c04d1a7a5a563!2sAllen+Northern+Samar!8m2!3d12.5033683!4d124.287538!16s%2Fg%2F11wy7kv42f!4m8!1m1!4e1!1m5!1m1!1s0x33a74d004d8b21bd:0x5b8c04d1a7a5a563!2m2!1d124.287538!2d12.5033683?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Victoria",
    x: 30,
    y: 60,
    href: "https://www.google.com/maps/dir/12.3200235,124.3449745/C8W7%2BHR8+UCCP+Vicroria,+Brgy,+Victoria/@12.3837021,124.2473868,12z/data=!3m1!4b1!4m17!1m7!3m6!1s0x33a74d01bddbdcd5:0xbe6db43d5c08e485!2sUCCP+Vicroria!8m2!3d12.4464124!4d124.3145644!16s%2Fg%2F11t74bnj0t!4m8!1m1!4e1!1m5!1m1!1s0x33a74d01bddbdcd5:0xbe6db43d5c08e485!2m2!1d124.3145643!2d12.4464127?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "San Isidro",
    x: 40,
    y: 55,
    href: "https://www.google.com/maps/dir/12.3200235,124.3449745/San+Isidro,+Northern+Samar/@12.3587892,124.3250142,13z/data=!4m18!1m8!3m7!1s0x33a74e2af321ab1d:0xd44779aa831f04ec!2sSan+Isidro,+Northern+Samar!3b1!8m2!3d12.3566415!4d124.3976356!16zL20vMDZuejRr!4m8!1m1!4e1!1m5!1m1!1s0x33a74e2af321ab1d:0xd44779aa831f04ec!2m2!1d124.3976356!2d12.3566415?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Alegria",
    x: 50,
    y: 50,
    href: "https://www.google.com/maps/dir/12.3200235,124.3449745/Alegria,+San+Isidro,+Northern+Samar/@12.3472324,124.2981846,13z/data=!3m1!4b1!4m18!1m8!3m7!1s0x33a7503949d433af:0x42625d448971d860!2sAlegria,+San+Isidro,+Northern+Samar!3b1!8m2!3d12.3715669!4d124.3449153!16s%2Fg%2F11f0wnfqpw!4m8!1m1!4e1!1m5!1m1!1s0x33a7503949d433af:0x42625d448971d860!2m2!1d124.3449153!2d12.3715669?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Salvacion",
    x: 59,
    y: 40,
    href: "https://www.google.com/maps/place/Salvacion,+San+Isidro,+Northern+Samar/@12.3628452,124.3337067,15z/data=!3m1!4b1!4m6!3m5!1s0x33a75017b971dc79:0x67763894bccc3573!8m2!3d12.3627523!4d124.3463031!16s%2Fg%2F11fyxb62t8?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "San Juan",
    x: 70,
    y: 25,
    href: "https://www.google.com/maps/place/San+Juan,+San+Isidro,+Northern+Samar/@12.3391715,124.3476909,14z/data=!4m16!1m9!3m8!1s0x33a7500a50b25837:0xbd9b9142d90e945a!2sSan+Juan,+San+Isidro,+Northern+Samar!3b1!8m2!3d12.3391715!4d124.3476909!10e5!16s%2Fg%2F11fyxdzwpl!3m5!1s0x33a7500a50b25837:0xbd9b9142d90e945a!8m2!3d12.3391715!4d124.3476909!16s%2Fg%2F11fyxdzwpl?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Palanit",
    x: 85,
    y: 20,
    href: "https://www.google.com/maps/place/Palanit,+San+Isidro,+Northern+Samar/@12.3232879,124.410383,13z/data=!3m1!4b1!4m6!3m5!1s0x33a75a1af3ca3dfb:0x20d90b12364ce097!8m2!3d12.3198273!4d124.4142776!16s%2Fg%2F11fyxds22m?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D",
  },
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
};

const flippedLocations = locations.map((loc) => ({
  ...loc,
  y: 100 - loc.y, // flip vertically
}));

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
            <p className="text-sm md:text-md text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover our vibrant communities across the region, each serving
              as a beacon of faith and fellowship
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
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                      linear-gradient(45deg, rgba(59,130,246,0.3) 1px, transparent 1px)
                    `,
                      backgroundSize: "40px 40px",
                    }}
                  ></div>
                </div>

                {/* Diagonal Zigzag Connection Line (Reversed) */}
                <svg
                  className="absolute top-0 left-0 w-full h-full"
                  viewBox="0 0 140 140"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M130,130 L115,115 L100,100 L85,85 L70,70 L55,55 L40,40 L25,25 L10,10"
                    stroke="url(#diagonalZigzagGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                  />
                  <defs>
                    <linearGradient
                      id="diagonalZigzagGradient"
                      x1="100%"
                      y1="100%"
                      x2="0%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#eab308" />
                      <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Central Header - Northern Samar Philippines */}
                <div className="absolute top-2 left-1/2 ml-3 transform -translate-x-1/2 md:text-sm text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-white/95 dark:bg-gray-800/95 px-2 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm shadow-lg border border-blue-200/60 dark:border-blue-700/40">
                  Northern Samar Philippines
                </div>

                {/* Location Pins */}
                <TooltipProvider>
                  {flippedLocations.map((location, index) => (
                    <motion.div
                      key={location.name}
                      className="absolute group cursor-pointer"
                      style={{
                        left: `${location.x}%`,
                        top: `${location.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={location.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center"
                          >
                            <div className="relative">
                              {/* Pin Shadow */}
                              <div className="absolute inset-0 w-8 h-8 bg-black/20 rounded-full blur-sm transform translate-y-1"></div>

                              {/* Pin Body */}
                              <div className="relative w-8 h-8 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 rounded-full shadow-lg border-2 border-white dark:border-gray-800">
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

                              {/* Subtle Glow Effect (always visible on desktop, no hover trigger) */}
                              <div className="absolute inset-0 w-8 h-8 bg-amber-400/30 rounded-full blur-md" />
                            </div>

                            {/* Always show name on mobile */}
                            <span className="block mt-1 text-[10px] font-medium text-gray-600 dark:text-gray-400 sm:hidden">
                              {location.name}
                            </span>
                          </a>
                        </TooltipTrigger>

                        {/* Tooltip for desktop */}
                        <TooltipContent
                          side="top"
                          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-xl hidden sm:block"
                        >
                          <div className="text-center space-y-1">
                            <p className="font-semibold text-gray-600 dark:text-gray-400 text-sm">
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

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 text-amber-600 dark:text-amber-400">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">Explore Our Circuit</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Each location represents a community of faith, united in purpose
              and dedicated to serving God and our neighbors. Join us in
              building stronger communities through spiritual growth and
              fellowship.
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
