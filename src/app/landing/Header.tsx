"use client";

import { Heart, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import AuthModal from "../auth/components/AuthModal";
import { useUser } from "../provider/UserContext";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/supabase/supabaseServer/auth";
import { toast } from "react-toastify";
import { ModeToggle } from "@/components/ModeToogle";

function Header() {
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const res = await Logout();

    if (!res.success) return toast.success(res.message);
    toast.success(res.message);
  };

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
          className="md:px-74"
        >
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">UCCP</span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex gap-8">
          {["about", "services", "events", "testimonials", "contact"].map(
            (section) => (
              <motion.div key={section}>
                <Link
                  href={`#${section}`}
                  className="text-lg  hover:text-yellow-500 transition-colors "
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </motion.div>
            )
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ModeToggle />
            {loading ? (
              <LoaderCircle className="animate-spin w-6 h-6 text-yellow-500" />
            ) : user ? (
              <Button
                onClick={handleLogout}
                className="text-yellow-700 hover:bg-yellow-600 text-md"
              >
                Logout
              </Button>
            ) : (
              <AuthModal />
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
