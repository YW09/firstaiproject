"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const m = 3; // slope
const b = 0; // intercept

// generate points for y = mx + b
const chartData = Array.from({ length: 21 }, (_, i) => {
  const x = i - 10; // range: -10 to 10
  return {
    x,
    y: m * x + b,
  };
});

const chartConfig = {
  y: {
    label: "y = mx + b",
    color: "var(--chart-1)",
  },
};

export function LinearPlot() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Linear Function Plot</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis dataKey="x" type="number" domain={["dataMin", "dataMax"]} />

            <YAxis />

            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />

            <Line type="linear" dataKey="y" stroke="var(--color-y)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
