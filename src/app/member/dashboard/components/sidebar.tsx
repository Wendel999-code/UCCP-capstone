"use client";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { motion } from "framer-motion";
import {
  ChartAreaIcon,
  File,
  History,
  Home,
  Inbox,
  Loader,
  LogOut,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SideBar = () => {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await LogoutV2();
      toast[res.success ? "success" : "error"](res.message);

      if (res.success) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.nav
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden sticky top-24 md:flex flex-col px-4 py-6 w-60 h-fit max-h-[85vh] overflow-y-auto 
    scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-600 
    hover:scrollbar-thumb-amber-400 dark:hover:scrollbar-thumb-amber-500 scrollbar-thumb-rounded-full
    rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 
    bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-amber-900/10"
    >
      {/* Sidebar Title */}
      <h1 className="text-lg font-bold tracking-wide text-center text-amber-900 dark:text-amber-400 pb-4 border-b border-amber-200/30 dark:border-amber-800/30">
        Member
      </h1>

      {/* Nav Items */}
      <ul className="mt-4 space-y-1">
        {[
          {
            href: "/member/dashboard",
            label: "Home",
            icon: <Home className="h-4 w-4" />,
          },
          {
            href: "/member/dashboard/linked-member",
            label: "Linked Member",
            icon: <Users className="h-4 w-4" />,
          },
          {
            href: "/member/dashboard/request",
            label: "Certificates",
            icon: <File className="h-4 w-4" />,
          },
          {
            href: "/member/dashboard/history",
            label: "History",
            icon: <History className="h-4 w-4" />,
          },
        ].map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border-l-4",
                  isActive
                    ? "bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 border-amber-500"
                    : "text-gray-600 dark:text-gray-300 border-transparent hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-amber-800/30 dark:hover:border-amber-600 hover:text-amber-900 dark:hover:text-amber-100"
                )}
              >
                {icon}
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <Button
        disabled={loading}
        onClick={handleLogout}
        size="sm"
        className="mt-6 w-full h-10 font-semibold rounded-lg shadow 
      bg-red-600 hover:bg-red-500 text-white dark:bg-red-800 dark:hover:bg-red-600 
      disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            <span>Logout</span>
            <LogOut className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.nav>
  );
};

export default SideBar;
