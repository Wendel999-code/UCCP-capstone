"use client";

import { useUser } from "@/app/provider/UserContext";
import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/supabase/actions/auth";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const Header = () => {
  const { user, loading } = useUser();

  const handleLogout = async () => {
    const res = await Logout();
    toast[res.success ? "success" : "error"](res.message);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className=" flex h-18 items-center px-4 justify-between ">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.jpg"
            alt="CANA Circuit Logo"
            width={72}
            height={56}
            className="rounded-full object-cover mx-18  transition-transform hover:scale-105"
          />
        </Link>

        <nav className="hidden md:flex gap-6">
          <motion.div
            className="flex items-center gap-3"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ModeToggle />

            {loading ? (
              <Skeleton className="h-5 w-5 " />
            ) : user ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="group h-7 px-3 text-[10px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
              >
                Logout
                <ArrowRight className="ml-1 h-[5px] w-[5px] transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              ""
            )}
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
