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
import { useEffect, useState } from "react";
import { GetPendingApplicationsCount } from "@/lib/supabase/actions/member";
import { ManageChurchById } from "@/lib/supabase/actions/church";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/supabase/client";
import { Logout } from "@/lib/supabase/actions/auth";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingCount, setPendingCount] = useState(0);

  const [brgy, setBrgy] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [churchRes, countRes] = await Promise.all([
          ManageChurchById(),
          GetPendingApplicationsCount(),
        ]);

        if (churchRes?.success) {
          setBrgy(churchRes?.brgy);
        }

        if (countRes?.success) {
          setPendingCount(countRes.count);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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
          fetchData();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

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
    <>
      <nav className="hidden md:grid px-4   items-start gap-2 py-4 w-[300px] h-[450px]   border rounded-md shadow-sm">
        <h1 className="text-2xl font-bold text-center text-amber-900 dark:text-yellow-400 ">
          {loading ? (
            <Skeleton className="rounded-2xl text-center w-[200px] h-[30px]" />
          ) : (
            brgy
          )}{" "}
        </h1>
        <Link
          href="/admin/dashboard"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
            pathname === "/admin/dashboard"
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
            pathname === "/admin/dashboard/members"
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
            pathname === "/admin/dashboard/applications"
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
          href="/admin/dashboard/documents"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
            pathname === "/dashboard/documents"
              ? "bg-yellow-100 text-yellow-900"
              : "text-muted-foreground"
          )}
        >
          <File className="h-5 w-5" />
          Documents
        </Link>
        <Link
          href="/admin/dashboard/events"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
            pathname === "/admin/dashboard/events"
              ? "bg-yellow-100 text-yellow-900"
              : "text-muted-foreground"
          )}
        >
          <Calendar className="h-5 w-5" />
          Events
        </Link>
        <Link
          href="/admin/dashboard/announcements"
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium hover:bg-yellow-100 hover:text-yellow-900",
            pathname === "/admin/dashboard/announcements"
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

        <Button
          onClick={handleLogout}
          variant={"outline"}
          className="font-medium mt-3  hover:cursor-pointer text-md dark:bg-red-600 text-white-900"
        >
          Logout <LogOut />
        </Button>
      </nav>
    </>
  );
};

export default SideBar;
