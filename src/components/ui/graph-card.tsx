"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AddWeightDialog } from "@/components/ui/add-weight-dialog";

interface Weight {
  id: string;
  value: number;
  measurementDay: Date;
}

interface ChartLineDotsProps {
  petId: string;
  weights: Weight[];
}

const chartConfig = {
  weight: {
    label: "Peso (kg)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineDots({ petId, weights }: ChartLineDotsProps) {
  if (!weights.length) {
    return (
      <Card className="bg-card text-card-foreground shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Peso do animal</CardTitle>
            <CardDescription>Histórico das últimas pesagens</CardDescription>
          </div>
          <AddWeightDialog petId={petId} />
        </CardHeader>
        <CardContent className="flex h-72 items-center justify-center text-muted-foreground">
          Nenhuma pesagem cadastrada.
        </CardContent>
      </Card>
    );
  }

  const chartData = [...weights]
    .sort(
      (a, b) =>
        new Date(a.measurementDay).getTime() -
        new Date(b.measurementDay).getTime(),
    )
    .map((item) => ({
      date: new Date(item.measurementDay).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      weight: item.value,
    }));

  const firstWeight = chartData[0].weight;
  const lastWeight = chartData[chartData.length - 1].weight;
  const difference = lastWeight - firstWeight;

  return (
    <Card className="bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Peso do animal</CardTitle>
          <CardDescription>Últimas {chartData.length} pesagens</CardDescription>
        </div>
        <AddWeightDialog petId={petId} />
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 12,
              right: 12,
              left: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} width={40} unit="kg" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="var(--color-weight)"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "var(--color-weight)",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          {difference > 0
            ? `Ganhou ${difference.toFixed(1)} kg`
            : difference < 0
              ? `Perdeu ${Math.abs(difference).toFixed(1)} kg`
              : "Peso estável"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <p className="text-muted-foreground">
          Peso atual: <strong>{lastWeight.toFixed(1)} kg</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
