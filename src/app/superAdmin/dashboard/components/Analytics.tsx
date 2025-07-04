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
import { useTheme } from "next-themes";

export function Analytics() {
  const { data, isLoading, error } = useCountMemPerChurch();
  const { theme } = useTheme();

  const chartData = data
    ? data.map((item) => ({
        circuit: item.brgy,
        members: item.member_count,
      }))
    : [];

  const totalMembers = chartData.reduce((sum, item) => sum + item.members, 0);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Member Distribution by Local Church</CardTitle>
        <CardDescription>
          Overview of all church members under your management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-8 gap-2 w-full h-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full rounded-sm animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
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
                  stroke={theme === "dark" ? "#333" : "#ccc"}
                />
                <XAxis
                  dataKey="circuit"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  style={{
                    fontSize: "10px",
                    fill: theme === "dark" ? "#ddd" : "#333",
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={30}
                  style={{
                    fontSize: "10px",
                    fill: theme === "dark" ? "#ddd" : "#333",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 p-2 rounded text-xs shadow">
                        <p>{payload[0].payload.circuit}</p>
                        <p className="font-semibold">
                          {payload[0].value} members
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar
                  dataKey="members"
                  fill={theme === "dark" ? "#4ade80" : "#fbbf24"}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={30}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Members Joined <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing the live total of members joined per local church under your
          UCCP management.
        </div>
        <div className="flex items-center gap-2 font-medium mt-2">
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
