"use client";

import { Minus, TrendingDown, TrendingUp } from "lucide-react";
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
      <Card className="w-full bg-card text-card-foreground shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
          <div className="min-w-0">
            <CardTitle className="text-base sm:text-lg">
              Peso do animal
            </CardTitle>
            <CardDescription>Histórico das últimas pesagens</CardDescription>
          </div>
          <AddWeightDialog petId={petId} />
        </CardHeader>
        <CardContent className="flex h-64 items-center justify-center text-muted-foreground text-sm">
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
    <Card className="w-full bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
        <div className="min-w-0">
          <CardTitle className="text-base sm:text-lg">Peso do animal</CardTitle>
          <CardDescription>Últimas {chartData.length} pesagens</CardDescription>
        </div>
        <AddWeightDialog petId={petId} />
      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        {/* altura fixa + overflow controlado */}
        <ChartContainer config={chartConfig} className="h-[240px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 8,
              right: 8,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              fontSize={11}
              unit="kg"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="var(--color-weight)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--color-weight)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-1.5 text-sm px-4 sm:px-6">
        <div className="flex items-center gap-2 font-medium">
          {difference > 0
            ? `Ganhou ${difference.toFixed(1)} kg`
            : difference < 0
              ? `Perdeu ${Math.abs(difference).toFixed(1)} kg`
              : "Peso estável"}

          {difference > 0 ? (
            <TrendingUp className="h-4 w-4 shrink-0 text-emerald-500" />
          ) : difference < 0 ? (
            <TrendingDown className="h-4 w-4 shrink-0 text-rose-500" />
          ) : (
            <Minus className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </div>
        <p className="text-muted-foreground">
          Peso atual: <strong>{lastWeight.toFixed(1)} kg</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
