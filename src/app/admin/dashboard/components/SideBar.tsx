"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Bell, File, UserCheck, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:grid px-4   items-start gap-2 py-4 w-[300px] h-[450px]  bg-white border rounded-md shadow-sm">
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
        href="/dashboard/announcements"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/announcements"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <UserCheck className="h-5 w-5" />
        Applications
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
      <Button className="font-medium mt-3">Logout</Button>
    </nav>
  );
};

export default SideBar;
