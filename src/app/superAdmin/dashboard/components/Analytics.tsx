"use client";

import { TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useCountMemPerChurch } from "@/app/hooks/useMember";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import supabase from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function Analytics() {
  const { data, isLoading, error, refetch } = useCountMemPerChurch();
  const { theme } = useTheme();

  useEffect(() => {
    const channel = supabase
      .channel("new-members-count-super-admin")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "member",
          filter: "activeStatus=eq.active",
        },
        () => {
          refetch();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "member",
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

  const chartData = data
    ? data.map((item) => ({
        circuit: item.brgy,
        members: item.member_count,
      }))
    : [];

  const totalMembers = chartData.reduce((sum, item) => sum + item.members, 0);

  return (
    <Card
      className="rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 
          bg-gradient-to-b from-white to-amber-50 dark:from-gray-950 dark:to-gray-900/40"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-amber-900 dark:text-amber-400">
          Member Distribution by Local Church
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Overview of all church members under your management.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-8 gap-2 w-full h-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full rounded-md bg-amber-100 dark:bg-amber-900/20 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">
            Error: {error.message}
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
                barCategoryGap={12}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={theme === "dark" ? "#333" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="circuit"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  style={{
                    fontSize: "11px",
                    fill: theme === "dark" ? "#ddd" : "#374151",
                    fontWeight: 500,
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={32}
                  style={{
                    fontSize: "11px",
                    fill: theme === "dark" ? "#ddd" : "#374151",
                    fontWeight: 500,
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
                    p-2 rounded-lg text-xs shadow-md"
                      >
                        <p className="text-amber-900 dark:text-amber-300 font-medium">
                          {payload[0].payload.circuit}
                        </p>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">
                          {payload[0].value} members
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar
                  dataKey="members"
                  fill={theme === "dark" ? "#4ade80" : "#f59e0b"} // amber-500 for light, green accent for dark
                  radius={[6, 6, 0, 0]}
                  maxBarSize={34}
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 text-sm border-t border-amber-200/30 dark:border-amber-900/30 pt-4">
        <div className="flex items-center gap-2 font-medium text-amber-900 dark:text-amber-300">
          Members Joined <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-gray-600 dark:text-gray-400 leading-snug">
          Showing the live total of members joined per local church under your
          UCCP management.
        </div>
        <div className="flex items-center gap-2 font-medium mt-1">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          Total Members:{" "}
          <span className="font-semibold text-green-700 dark:text-green-300">
            {totalMembers}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
