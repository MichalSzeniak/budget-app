import { useMemo, useState } from "react";
import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";
import DashboardDetails from "./DashboardDetails";
import DialogAddPayment from "../dialogs/DialogAddPayment";
import { Button } from "../ui/button";
import { DateRange } from "react-day-picker";
import BalanceDisplay from "./BalanceDisplay";
import DateRangePickerWithReset from "./DateRangePickerWithReset";

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
      <Tabs
        value={type}
        onValueChange={setType}
        defaultValue="expense"
        className=""
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="expense">Expanses</TabsTrigger>
          <TabsTrigger value="income">Incomes</TabsTrigger>
        </TabsList>
        <TabsContent value="expense">
          <Card>
            <CardHeader></CardHeader>
            <CardContent className="space-y-2">
              <DashboardDetails type="expense" date={date} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income">
          <Card>
            <CardHeader></CardHeader>
            <CardContent className="space-y-2">
              <DashboardDetails type="income" date={date} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default DashboardTabs;
