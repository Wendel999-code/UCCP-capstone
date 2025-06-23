"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
  { circuit: "Palanit", members: 186 },
  { circuit: "San Juan", members: 305 },
  { circuit: "Salvacion", members: 237 },
  { circuit: "Alegria", members: 73 },
  { circuit: "San Isidro", members: 209 },
  { circuit: "Victoria", members: 294 },
  { circuit: "Allen", members: 614 },
  { circuit: "Lipata", members: 214 },
  { circuit: "Cabacungan", members: 114 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Analytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Distribution by Circuit</CardTitle>
        <CardDescription>
          Overview of all church circuits under your management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 0, left: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="circuit"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey={"members"}
              fill="var(--color-desktop)"
              radius={8}
            ></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Member's Joined <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing the total of members joined in Cana Circuit
        </div>
      </CardFooter>
    </Card>
  );
}
