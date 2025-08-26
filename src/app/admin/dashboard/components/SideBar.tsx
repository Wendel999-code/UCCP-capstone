"use client";

import { useSidebarData } from "@/app/hooks/useSideBar";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LogoutV2 } from "@/lib/supabase/actions/authV2";
import supabase from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { File, Home, Loader, LogOut, UserCheck, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SideBar = () => {
  const pathname = usePathname();
  const { data, isLoading, refetch } = useSidebarData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("application-count & cert-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "member" },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "req_certificate" },
        () => {
          refetch();
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [refetch]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await LogoutV2();
      if (res.success) {
        toast.success("Logout successfully");
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
      className="hidden sticky top-20 md:flex flex-col px-4 py-6 w-60 h-fit max-h-[85vh] 
        overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-amber-300 
        dark:scrollbar-thumb-amber-600 hover:scrollbar-thumb-amber-400 dark:hover:scrollbar-thumb-amber-500 
        scrollbar-thumb-rounded-full bg-card"
    >
      {/* Sidebar Title */}
      <h1 className="text-lg font-bold tracking-wide text-center text-amber-900 dark:text-amber-400 pb-4 border-b border-amber-200/30 dark:border-amber-800/30">
        {isLoading ? (
          <Skeleton className="rounded-2xl bg-neutral-300 dark:bg-neutral-700 text-center w-[180px] h-[24px]" />
        ) : (
          (data?.church?.brgy ?? "Admin Panel")
        )}
      </h1>

      {/* Nav Items */}
      <ul className="mt-4 space-y-1">
        {[
          {
            href: "/admin/dashboard",
            label: "Dashboard",
            icon: <Home className="h-4 w-4" />,
          },
          {
            href: "/admin/dashboard/members",
            label: "Members",
            icon: <Users className="h-4 w-4" />,
          },
          {
            href: "/admin/dashboard/applications",
            label: "Applications",
            icon: <UserCheck className="h-4 w-4" />,
            extra: (data?.pendingCount ?? 0) > 0 && (
              <span className="ml-auto flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                {data?.pendingCount}
              </span>
            ),
          },
          {
            href: "/admin/dashboard/certificates",
            label: "Certificates",
            icon: <File className="h-4 w-4" />,
            extra: (data?.certCount ?? 0) > 0 && (
              <span className="ml-auto flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                {data?.certCount}
              </span>
            ),
          },
        ].map(({ href, label, icon, extra }) => {
          const isActive =
            href === "/admin/dashboard"
              ? pathname === "/admin/dashboard"
              : pathname.startsWith(href);

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
                {extra}
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
