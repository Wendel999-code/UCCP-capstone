"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  Users,
  //   Heart,
  Bell,
} from "lucide-react";

import { cn } from "@/app/lib/utils";
// import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden md:grid   items-start gap-2 py-4 w-[300px] h-[25rem] bg-white border rounded-md shadow-sm">
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
        href="/dashboard/events"
        className={cn(
          "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
          pathname === "/dashboard/events"
            ? "bg-yellow-100 text-yellow-900"
            : "text-muted-foreground"
        )}
      >
        <Calendar className="h-5 w-5" />
        Events
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
        <Bell className="h-5 w-5" />
        Announcements
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
        <BookOpen className="h-5 w-5" />
        Spiritual Growth
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
        <Users className="h-5 w-5" />
        Community
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
        <MessageSquare className="h-5 w-5" />
        Messages
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-200 text-sm font-medium text-yellow-900">
          3
        </span>
      </Link>
      <Link
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
      </Link>
    </nav>
  );
};

export default Sidebar;
