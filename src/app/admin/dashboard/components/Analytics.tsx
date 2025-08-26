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
  { name: "Members", value: 0, fill: "#22c55e", labelColor: "#15803d" }, // green-500, label darker green
  { name: "Certificates", value: 0, fill: "#3b82f6", labelColor: "#1e40af" }, // blue-500, label darker blue
  { name: "Visitors", value: 0, fill: "#facc15", labelColor: "#ca8a04" }, // yellow-400, label darker yellow
];

function Analytics() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    data: completedCertificates,
    isLoading,
    error,
  } = useCountCompletedReqCertificate();
  if (completedCertificates !== undefined)
    chartData[1].value = completedCertificates;

  const { data: count } = useVisitCount();
  if (count !== undefined) chartData[2].value = count;

  const { data: memberCount } = useCountMemPerChurchAdmin();
  if (memberCount !== undefined) chartData[0].value = memberCount;

  return (
    <Card
      className="rounded-2xl shadow-xl border border-amber-200/40 dark:border-amber-800/30 
      bg-white dark:bg-gray-900/80 backdrop-blur"
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-amber-900 dark:text-amber-400">
          Analytics
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Overview of members, certificates, and visits under your management.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-8 gap-2 w-full h-60">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-full rounded-md animate-pulse bg-amber-100/70 dark:bg-amber-900/20"
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
                barCategoryGap={50}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke={isDark ? "#444" : "#ddd"}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={0}
                  style={{ fontSize: "13px", fill: isDark ? "#eee" : "#333" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={40}
                  style={{ fontSize: "12px", fill: isDark ? "#eee" : "#333" }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div
                        className="bg-white dark:bg-gray-800 border dark:border-gray-700 
                        p-2 rounded-lg text-xs shadow-md"
                      >
                        <p className="font-semibold text-amber-700 dark:text-amber-300">
                          {payload[0].payload.name}: {payload[0].payload.value}
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={50}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  {chartData.map((entry, index) => (
                    <LabelList
                      key={`label-${index}`}
                      dataKey="value"
                      position="top"
                      content={({ x, y, value }) =>
                        value !== 0 ? (
                          <text
                            x={(x as number) + 20}
                            y={(y as number) - 6}
                            textAnchor="middle"
                            fontSize={13}
                            fontWeight={600}
                            fill={entry.labelColor}
                          >
                            {value}
                          </text>
                        ) : null
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 text-sm border-t border-amber-200/30 dark:border-amber-800/30 pt-4">
        <div className="flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
          Engagement Overview <TrendingUp className="h-4 w-4" />
        </div>
        <p className="text-muted-foreground leading-snug">
          Live totals of members, certificate requests, and page visits under
          your UCCP management.
        </p>
        <div className="flex items-center gap-2 font-medium mt-2 text-green-700 dark:text-green-300">
          <Users className="h-4 w-4" />
          Total Members: <span className="font-bold">{memberCount ?? 0}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Analytics;
