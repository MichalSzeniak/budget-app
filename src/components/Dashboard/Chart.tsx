import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { Transaction, TransactionsState } from "@/store/transactionsSlice";

const chartConfig = {
  health: {
    label: "Health",
    color: "hsl(var(--chart-health))",
  },
  home: {
    label: "Home",
    color: "hsl(var(--chart-home))",
  },
  leisure: {
    label: "Leisure",
    color: "hsl(var(--chart-leisure))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-education))",
  },
  gifts: {
    label: "Gifts",
    color: "hsl(var(--chart-gifts))",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-groceries))",
  },
  family: {
    label: "Family",
    color: "hsl(var(--chart-family))",
  },
  workout: {
    label: "Workout",
    color: "hsl(var(--chart-workout))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-transportation))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-other))",
  },
} satisfies ChartConfig;

interface ChartConfigItem {
  label: string;
  color: string;
}

interface ChartConfig {
  [key: string]: ChartConfigItem;
}

interface ChartDataItem {
  category: string;
  amount: number;
  fill: string;
}

const Chart = ({ transactions }: TransactionsState) => {
  const useChartData = (
    data: Transaction[],
    chartConfig: ChartConfig
  ): ChartDataItem[] => {
    return useMemo(() => {
      const aggregatedData = data.reduce(
        (acc: { [key: string]: number }, item) => {
          const category = item.category.toLowerCase();
          acc[category] = (acc[category] || 0) + item.amount;
          return acc;
        },
        {}
      );

      return Object.entries(aggregatedData).map(([category, amount]) => {
        const configItem = chartConfig[category];
        return {
          category: configItem ? configItem.label : "Other",
          amount,
          fill: configItem ? configItem.color : chartConfig.other.color,
        };
      });
    }, [data, chartConfig]);
  };
  const chartData = useChartData(transactions, chartConfig);

  const totalAmount = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col w-full">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          zł
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default Chart;
