"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

import { useUser } from "../provider/UserContext";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { ModeToggle } from "@/components/ModeToogle";
import { Logout } from "@/lib/supabase/actions/auth";
import Image from "next/image";

function Header() {
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const res = await Logout();

    toast[res.success ? "success" : "error"](res.message);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur  supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between py-16">
        <Link href="/">
          <div className="px-4 md:px-16">
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_LOGO!}
              alt="CANA Circuit Logo"
              width={100}
              height={80}
              className="rounded-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </Link>

        <nav className="hidden md:flex gap-8">
          {["about", "services", "events", "testimonials", "contact"].map(
            (section) => (
              <motion.div
                key={section}
                className="flex items-center justify-center"
              >
                <Link
                  href={`#${section}`}
                  className="text-md  hover:text-yellow-500 transition-colors  "
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </motion.div>
            )
          )}

          <motion.div
            className="flex  gap-3"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ModeToggle />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : user ? (
              <>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="group h-[30px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
                >
                  Logout
                  <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </>
            ) : (
              <Link href={"/auth/login"}>
                {" "}
                <Button
                  variant="outline"
                  size="sm"
                  className="group h-[30px] cursor-pointer dark:bg-amber-700 dark:hover:bg-amber-600 bg-amber-500 hover:bg-amber-600   "
                >
                  Sign in
                  <ArrowRight className="ml-2 h-2 w-2 transition-transform group-hover:translate-x-1 " />
                </Button>
              </Link>
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}

export default Header;
