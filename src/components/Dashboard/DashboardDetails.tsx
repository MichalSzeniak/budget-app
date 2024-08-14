import { useMemo, useState } from "react";
import Chart from "./Chart";
import DashboardTable from "./DashboardTable";
import FilterDropdown from "./FilterDropdown";
import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const DashboardDetails = () => {
  const transactions = useSelector(selectTransactions);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(
        (tx) =>
          filteredCategories.length === 0 ||
          filteredCategories.includes(tx.category)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filteredCategories]);

  const filteredExpenses = useMemo(() => {
    return filteredTransactions.filter((item) => item.type === "expense");
  }, [filteredTransactions]);

  const totalIncomes = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncomes - totalExpenses;
  }, [totalIncomes, totalExpenses]);

  return (
    <div className="relative w-full">
      <span
        className={cn(
          balance > 0 ? "text-green-500" : "text-red-400",
          "absolute top-2 left-2  font-bold"
        )}
      >
        Balance: {balance} zł
      </span>
      <div className="absolute top-2 right-2">
        <FilterDropdown onFilterChange={setFilteredCategories} />
      </div>
      <Chart transactions={filteredExpenses} />
      <DashboardTable transactions={filteredTransactions} />
    </div>
  );
};
export default DashboardDetails;
