import { useMemo, useState } from "react";
import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import DialogAddPayment from "../dialogs/DialogAddPayment";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import BalanceDisplay from "./BalanceDisplay";
import DateRangePickerWithReset from "./DateRangePickerWithReset";
import DashboardTabsWithContent from "./DashboardTabsWithContent";

const DashboardTabs = () => {
  const [type, setType] = useState("expense");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const resetDate = () =>
    setDate({
      from: undefined,
      to: undefined,
    });

  const transactions = useSelector(selectTransactions);

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
    <div className="w-full">
      <BalanceDisplay balance={balance} />
      <div className="flex justify-between mb-5 flex-col sm:flex-row">
        <DateRangePickerWithReset
          date={date}
          setDate={setDate}
          resetDate={resetDate}
        />
        <DialogAddPayment type={type} trigger={<Button>Add {type}</Button>} />
      </div>
      <DashboardTabsWithContent type={type} setType={setType} date={date} />
    </div>
  );
};
export default DashboardTabs;
