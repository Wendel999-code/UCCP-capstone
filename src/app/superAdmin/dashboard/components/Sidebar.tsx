"use client";

import { Bell, Calendar, Home, Loader, LogOut, Users } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/supabase/actions/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

const SuperAdminSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await Logout();
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      router.replace("/");
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
      href: "/admin/dashboard/events",
      label: "Events",
      icon: Calendar,
    },
    {
      href: "/admin/dashboard/announcements",
      label: "Announcements",
      icon: Bell,
      badge: "3",
    },
  ];

  return (
    <motion.nav
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden md:flex flex-col sticky top-20 px-4 py-5 w-56 h-fit max-h-[85vh] overflow-y-auto bg-white dark:bg-muted border rounded-xl shadow-md space-y-6"
    >
      <h1 className="text-2xl font-bold text-center text-amber-900 dark:text-yellow-400">
        Cana Circuit
      </h1>

      <ul className="space-y-1">
        {links.map(({ href, label, icon: Icon, badge }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-yellow-100 text-yellow-900 dark:bg-yellow-300/10 dark:text-yellow-300"
                    : "text-muted-foreground hover:bg-yellow-50 hover:text-yellow-800 dark:hover:bg-muted-foreground/10"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </div>
                {badge && (
                  <span className="ml-auto h-5 w-5 text-xs font-semibold text-yellow-900 bg-yellow-200 dark:bg-yellow-400/80 dark:text-yellow-900 flex items-center justify-center rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        onClick={handleLogout}
        size="sm"
        className="mt-auto h-9 text-sm font-semibold bg-red-900 text-white hover:bg-red-500 cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {" "}
            Logout
            <LogOut className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.nav>
  );
};

export default SuperAdminSideBar;
