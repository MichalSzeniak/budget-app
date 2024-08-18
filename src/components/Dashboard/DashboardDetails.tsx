import { useSelector } from "react-redux";
import DashboardTable from "./DashboardTable";
import FilterDropdown from "./FilterDropdown";
import { useMemo, useState } from "react";
import { selectTransactions } from "@/store/transactionsSlice";
import DashboardChart from "./DashboardChart";

interface DashboardDetailsProps {
  type: "expense" | "income";
}

const DashboardDetails = ({ type }: DashboardDetailsProps) => {
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
    return filteredTransactions.filter((item) => item.type === type);
  }, [filteredTransactions, type]);

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
