"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  Home,
  Bell,
  File,
  UserCheck,
  Users,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetPendingApplicationsCount } from "@/lib/supabase/supabaseServer/member";
import supabase from "@/lib/supabase/supabaseClient/supabaseClient";

const SideBar = () => {
  const pathname = usePathname();

  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      const result = await GetPendingApplicationsCount();
      if (result.success) {
        setPendingCount(result.count);
      }
    };

    fetchPendingCount();

    // Set up real-time subscription view livecount
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
          fetchPendingCount();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <nav className="hidden md:grid px-4   items-start gap-2 py-4 w-[300px] h-[450px]   border rounded-md shadow-sm">
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Home className="h-5 w-5" />
        Dashboard
      </Link>

      <Link
        href="/admin/dashboard/members"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/events"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Users className="h-5 w-5" />
        Members
      </Link>
      <Link
        href="/admin/dashboard/applications"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/announcements"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <UserCheck className="h-5 w-5" />
        Applications{" "}
        {pendingCount > 0 && (
          <span className="  h-5 w-5 text-sm font-bold text-red-500">
            {pendingCount}
          </span>
        )}
      </Link>
      <Link
        href="/dashboard/spiritual-growth"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/spiritual-growth"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <File className="h-5 w-5" />
        Documents
      </Link>
      <Link
        href="/dashboard/community"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/community"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Calendar className="h-5 w-5" />
        Events
      </Link>
      <Link
        href="/dashboard/messages"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/messages"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Bell className="h-5 w-5" />
        Announcements
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-200 text-sm font-medium text-yellow-900">
          3
        </span>
      </Link>
      {/* <Link
        href="/dashboard/settings"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/settings"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Settings className="h-5 w-5" />
        Settings
      </Link> */}
      <Button
        variant={"outline"}
        className="font-medium mt-3  hover:cursor-pointer text-md dark:bg-red-600 text-white-900"
      >
        Logout <LogOut />
      </Button>
    </nav>
  );
};

export default SideBar;
