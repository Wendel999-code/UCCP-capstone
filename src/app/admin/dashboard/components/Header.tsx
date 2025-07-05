"use client";

import { useUser } from "@/app/provider/UserContext";
import { ModeToggle } from "@/components/ModeToogle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Logout } from "@/lib/supabase/actions/auth";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Header = () => {
  const { user, loading } = useUser();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await Logout();
      toast[res.success ? "success" : "error"](res.message);

      if (res.success) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An unexpected error occurred during logout.");
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className=" flex h-18 items-center px-6 justify-between ">
        <Link href="/admin/dashboard" className="flex items-center">
          <Image
            src="/uccp.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full rounded-b-3xl dark:rounded-b-full h-11 dark:h-10  w-10 object-cover md:ml-22"
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
