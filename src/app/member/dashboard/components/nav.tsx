"use client";

// import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

const Nav = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between py-16">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="px-32"
        >
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">NorWesCom</span>
          </Link>
        </motion.div>
        {/* <Button>Logout</Button> */}
      </div>
    </motion.header>
  );
};

export default Nav;
