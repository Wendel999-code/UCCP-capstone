"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  Home,
  Bell,
  File,
  UserCheck,
  Users,
  LogOut,
} from "lucide-react";

import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/supabase/client";
import { Logout } from "@/lib/supabase/actions/auth";
import { motion } from "framer-motion";
import { useSidebarData } from "@/app/hooks/useSideBar";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading, refetch } = useSidebarData();

  useEffect(() => {
    const channel = supabase
      .channel("pending-applications")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Member",
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
    }
  };

  return (
    <motion.nav
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:grid px-3 items-start gap-2 py-3 w-[200px] h-[420px] border rounded-md shadow-sm"
    >
      <h1 className="text-xl font-bold text-center text-amber-900 dark:text-yellow-400">
        {isLoading ? (
          <Skeleton className="rounded-2xl text-center w-[180px] h-[24px]" />
        ) : (
          data?.brgy
        )}
      </h1>

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
          href: "/admin/dashboard/documents",
          label: "Documents",
          icon: <File className="h-4 w-4" />,
        },
        {
          href: "/admin/dashboard/events",
          label: "Events",
          icon: <Calendar className="h-4 w-4" />,
        },
        {
          href: "/admin/dashboard/announcements",
          label: "Announcements",
          icon: <Bell className="h-4 w-4" />,
          extra: (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-200 text-xs font-medium text-yellow-900">
              3
            </span>
          ),
        },
      ].map(({ href, label, icon, extra }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-900",
            pathname === href
              ? "bg-yellow-100 text-yellow-900"
              : "text-muted-foreground"
          )}
        >
          {icon}
          {label}
          {extra}
        </Link>
      ))}

      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="group h-7 px-3 mt-3 text-[10px] cursor-pointer dark:bg-red-900 dark:hover:bg-red-700 bg-red-700 text-white hover:bg-red-600"
      >
        Logout
        <LogOut className="ml-1 h-[5px] w-[5px] transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.nav>
  );
};

export default SideBar;
