"use client";

import { useCountCompletedReqCertificate } from "@/app/hooks/useCertificate";
import { useCountMemPerChurchAdmin } from "@/app/hooks/useMember";
import { useVisitCount } from "@/app/hooks/visit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Users } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { name: "Members", value: 0, fill: "#4ade80" },
  { name: "Certificates", value: 0, fill: "#3b82f6" },
  { name: "Visitors", value: 0, fill: "#facc15" },
];

function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    data: completedCertificates,
    isLoading,
    error,
  } = useCountCompletedReqCertificate();

  if (completedCertificates !== undefined) {
    chartData[1].value = completedCertificates;
  }

  const { data: count } = useVisitCount();

  if (count !== undefined) {
    chartData[2].value = count;
  }

  const { data: memberCount } = useCountMemPerChurchAdmin();

  if (memberCount !== undefined) {
    chartData[0].value = memberCount;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Analytics</CardTitle>
        <CardDescription>
          Overview of members, certificates, and visits under your management.
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
                barCategoryGap={50}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={isDark ? "#333" : "#ccc"}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={0}
                  style={{ fontSize: "12px", fill: isDark ? "#ddd" : "#333" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                  style={{ fontSize: "12px", fill: isDark ? "#ddd" : "#333" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 p-2 rounded text-xs shadow">
                        <p className="font-semibold">
                          {payload[0].payload.name}: {payload[0].payload.value}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    fill={isDark ? "#ddd" : "#111"}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Engagement Overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Live total of members, certificate requests, and page visits under
          your UCCP management.
        </div>
        <div className="flex items-center gap-2 font-medium mt-2">
          <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          Total Members:{" "}
          <span className="font-semibold text-green-700 dark:text-green-300">
            {memberCount}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Analytics;
