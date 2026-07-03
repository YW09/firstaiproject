"use client";

import { addHours, endOfToday, format, parseISO, subHours } from "date-fns";
import { Area, CartesianGrid, ComposedChart, Line, XAxis } from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartValues = [
  { newCustomers: 23840, activeAccounts: 6630, returningUsers: 4880 },
  { newCustomers: 11508, activeAccounts: 6468, returningUsers: 4643 },
  { newCustomers: 9975, activeAccounts: 6117, returningUsers: 4573 },
  { newCustomers: 10310, activeAccounts: 6152, returningUsers: 4657 },
  { newCustomers: 12244, activeAccounts: 6473, returningUsers: 4657 },
  { newCustomers: 11476, activeAccounts: 6347, returningUsers: 4533 },
  { newCustomers: 9944, activeAccounts: 6250, returningUsers: 4588 },
  { newCustomers: 10259, activeAccounts: 6417, returningUsers: 4763 },
  { newCustomers: 9698, activeAccounts: 6256, returningUsers: 4710 },
  { newCustomers: 8435, activeAccounts: 6161, returningUsers: 4544 },
  { newCustomers: 8885, activeAccounts: 6510, returningUsers: 4595 },
];

const endDate = endOfToday();
const startDate = subHours(endDate, (chartValues.length - 1) * 12);

const chartData = chartValues.map((point, index) => ({
  date: format(addHours(startDate, index * 12), "yyyy-MM-dd"),
  ...point,
}));

const chartConfig = {
  newCustomers: {
    label: "New Customers",
    color: "var(--chart-1)",
  },
  activeAccounts: {
    label: "Active Accounts",
    color: "var(--chart-2)",
  },
  returningUsers: {
    label: "Returning Users",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PerformanceOverview() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="leading-none">Customer Activity</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">Customer activity for the last 3 months</span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction className="flex items-center gap-2">
          <Select defaultValue="quarter">
            <SelectTrigger size="sm" className="w-28">
              <SelectValue placeholder="3 months" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Period</SelectLabel>
                <SelectItem value="quarter">3 months</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger size="sm" className="w-32">
              <SelectValue placeholder="All segments" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Segments</SelectLabel>
                <SelectItem value="all">All segments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            View report
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
          <ComposedChart data={chartData} margin={{ top: 0 }}>
            <defs>
              <linearGradient id="fillNewCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-newCustomers)" stopOpacity={0.36} />
                <stop offset="95%" stopColor="var(--color-newCustomers)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeOpacity={0.5} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={48}
              tickFormatter={(value) =>
                parseISO(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-50"
                  indicator="line"
                  labelFormatter={(value) => format(parseISO(value), "d MMMM yyyy")}
                />
              }
            />
            <ChartLegend verticalAlign="top" content={<ChartLegendContent className="mb-5 justify-end" />} />

            <Area
              dataKey="newCustomers"
              type="natural"
              fill="url(#fillNewCustomers)"
              stroke="var(--color-newCustomers)"
              strokeWidth={1.25}
              dot={false}
              fillOpacity={1}
            />
            <Line
              dataKey="activeAccounts"
              type="natural"
              stroke="var(--color-activeAccounts)"
              strokeWidth={1.4}
              dot={false}
            />
            <Line
              dataKey="returningUsers"
              type="natural"
              stroke="var(--color-returningUsers)"
              strokeWidth={1.2}
              dot={false}
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
