import { useSelector } from "react-redux";
import DashboardTable from "./DashboardTable";
import FilterDropdown from "./FilterDropdown";
import { useMemo, useState } from "react";
import { selectTransactions } from "@/store/transactionsSlice";
import DashboardChart from "./DashboardChart";
import { DateRange } from "react-day-picker";

interface DashboardDetailsProps {
  type: "expense" | "income";
  date: DateRange | undefined;
}

const DashboardDetails = ({ type, date }: DashboardDetailsProps) => {
  const transactions = useSelector(selectTransactions);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const isWithinDateRange =
          (!date?.from || transactionDate >= new Date(date.from)) &&
          (!date?.to || transactionDate <= new Date(date.to));
        return isWithinDateRange;
      })
      .filter(
        (tx) =>
          filteredCategories.length === 0 ||
          filteredCategories.includes(tx.category)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filteredCategories, date]);

  const filteredExpenses = useMemo(() => {
    return filteredTransactions.filter((item) => item.type === type);
  }, [filteredTransactions, type]);

  if (!filteredExpenses.length) {
    return (
      <div className="flex justify-center">
        No data in the selected time period
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2">
        <FilterDropdown onFilterChange={setFilteredCategories} type={type} />
      </div>
      <DashboardChart transactions={filteredExpenses} />
      <DashboardTable transactions={filteredExpenses} />
    </div>
  );
};
export default DashboardDetails;
