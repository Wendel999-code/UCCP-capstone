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
      .channel("pending-applications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "member",
          filter: "activeStatus=eq.pending",
        },
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
      className="hidden sticky top-20 md:grid px-4 py-5 w-56 h-fit max-h-[85vh] overflow-y-auto bg-white dark:bg-muted border rounded-xl shadow-md space-y-6"
    >
      <h1 className="text-xl font-bold text-center text-amber-900 dark:text-yellow-400">
        {isLoading ? (
          <Skeleton className="rounded-2xl bg-neutral-300 dark:bg-neutral-700 text-center w-[180px] h-[24px]" />
        ) : (
          data?.church?.brgy
        )}
      </h1>

      <ul className="space-y-1">
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
              <span className="ml-auto h-5 w-5 text-xs font-bold text-red-500">
                {data?.pendingCount}
              </span>
            ),
          },
          {
            href: "/admin/dashboard/certificates",
            label: "Certificates",
            icon: <File className="h-4 w-4" />,
          },
          // {
          //   href: "/admin/dashboard/events",
          //   label: "Events",
          //   icon: <Calendar className="h-4 w-4" />,
          // },
          // {
          //   href: "/admin/dashboard/announcements",
          //   label: "Announcements",
          //   icon: <Bell className="h-4 w-4" />,
          //   extra: (
          //     <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-200 text-xs font-medium text-yellow-900">
          //       3
          //     </span>
          //   ),
          // },
        ].map(({ href, label, icon, extra }) => {
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
                  {icon}
                  {label}
                </div>
                {extra}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        disabled={loading}
        onClick={handleLogout}
        size="sm"
        className="mt-auto disabled:cursor-not-allowed h-9 text-sm font-semibold bg-red-900 text-white hover:bg-red-500 cursor-pointer"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <>
            {" "}
            <span>Logout</span>
            <LogOut className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </motion.nav>
  );
};

export default SideBar;
