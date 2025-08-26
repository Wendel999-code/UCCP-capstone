"use client";

import { Home, Loader, LogOut, Logs, UserCog2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const SuperAdminSideBar = () => {
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(false);
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

  const links = [
    {
      href: "/superAdmin/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/superAdmin/dashboard/members",
      label: "Members",
      icon: Users,
    },
    {
      href: "/superAdmin/dashboard/reports",
      label: "Reports",
      icon: Logs,
    },
    {
      href: "/superAdmin/dashboard/users",
      label: "Users",
      icon: UserCog2,
    },
    // {
    //   href: "/admin/dashboard/announcements",
    //   label: "Announcements",
    //   icon: Bell,
    //   badge: "3",
    // },
  ];

  return (
    <motion.nav
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="hidden md:flex flex-col sticky top-20 px-5 py-6 w-60 h-fit max-h-[85vh] 
    overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-700 
    hover:scrollbar-thumb-amber-400 dark:hover:scrollbar-thumb-amber-600 scrollbar-thumb-rounded-full
    bg-gradient-to-b from-white to-amber-50 dark:from-gray-950 dark:to-gray-900/40 
    border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg space-y-6"
    >
      {/* Sidebar Title */}
      <h1 className="text-xl font-extrabold tracking-wide text-center text-amber-900 dark:text-amber-400">
        Cana Circuit
      </h1>

      {/* Navigation Links */}
      <ul className="space-y-1.5">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 w-full rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 border-l-4",
                  isActive
                    ? "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100 border-amber-500 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 border-transparent hover:bg-amber-50 hover:text-amber-900 hover:border-amber-300 dark:hover:bg-amber-800/30 dark:hover:text-amber-100 dark:hover:border-amber-600"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        size="sm"
        className="mt-auto h-10 text-sm font-semibold rounded-lg shadow-md
      bg-red-600 hover:bg-red-500 dark:bg-red-800 dark:hover:bg-red-600 
      text-white flex items-center justify-center transition-colors duration-200"
      >
        {isLoading ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            Logout
            <LogOut className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.nav>
  );
};

export default SuperAdminSideBar;
