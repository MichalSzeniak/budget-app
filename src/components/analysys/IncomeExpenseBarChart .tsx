import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import {
  format,
  subMonths,
  subYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  startOfISOWeek,
  endOfISOWeek,
} from "date-fns";
import { useSelector } from "react-redux";
import { selectTransactions } from "@/store/transactionsSlice";
import TimeRangeSelect from "./TimeRangeSelect";

interface Transaction {
  date: string;
  type: "income" | "expense";
  amount: number;
}

const chartConfig: ChartConfig = {
  income: {
    label: "Incomes",
    color: "hsl(var(--chart-transportation))",
  },
  expense: {
    label: "Expenses",
    color: "hsl(var(--chart-other))",
  },
};

const NUM_MONTHS_TO_DISPLAY = 5;
const NUM_YEARS_TO_DISPLAY = 5;

interface IncomeExpenseBarChartProps {
  type: "income" | "expense" | "general";
}

const IncomeExpenseBarChart = ({ type }: IncomeExpenseBarChartProps) => {
  const [timeRange, setTimeRange] = useState<"year" | "month" | "week">("week");
  const transactions = useSelector(selectTransactions) as Transaction[];

  const today = new Date();
  const startDate =
    timeRange === "year"
      ? subYears(today, NUM_YEARS_TO_DISPLAY)
      : timeRange === "month"
      ? subMonths(today, NUM_MONTHS_TO_DISPLAY)
      : startOfISOWeek(today);
  const endDate = timeRange === "week" ? endOfISOWeek(today) : today;

  const dateIntervals = {
    year: eachYearOfInterval,
    month: eachMonthOfInterval,
    week: eachDayOfInterval,
  };
  const formatPatterns = {
    year: "yyyy",
    month: "MMM",
    week: "dd MMM",
  };

  const completeDateRange = dateIntervals[timeRange]({
    start: startDate,
    end: endDate,
  }).map((date) => format(date, formatPatterns[timeRange]));

  const filteredTransactions = transactions.filter(
    (transaction) => type === "general" || transaction.type === type
  );

  const incomeExpenseData = filteredTransactions.reduce<
    Record<string, { date: string; income: number; expense: number }>
  >((acc, transaction) => {
    const dateKey = format(
      new Date(transaction.date),
      formatPatterns[timeRange]
    );
    if (!acc[dateKey]) acc[dateKey] = { date: dateKey, income: 0, expense: 0 };
    acc[dateKey][transaction.type] += transaction.amount;
    return acc;
  }, {});

  const chartData = completeDateRange.map(
    (date) => incomeExpenseData[date] || { date, income: 0, expense: 0 }
  );

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center p-2">
        <CardDescription>
          {format(startDate, "dd MMM yyyy")} - {format(endDate, "dd MMM yyyy")}
        </CardDescription>
        <TimeRangeSelect value={timeRange} onChange={setTimeRange} />
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-56 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <>
              <Bar
                dataKey={type === "expense" ? "expense" : "income"}
                fill={
                  type === "expense"
                    ? "var(--color-expense)"
                    : "var(--color-income)"
                }
                radius={4}
              />
              {type === "general" && (
                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
              )}
            </>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseBarChart;
