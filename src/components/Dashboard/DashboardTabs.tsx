import { useMemo, useState } from "react";
import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";
import DashboardDetails from "./DashboardDetails";
import DialogAddPayment from "../dialogs/DialogAddPayment";
import { Button } from "../ui/button";

const DashboardTabs = () => {
  const [type, setType] = useState("expense");

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
      <p className="absolute top-0 left-1/2 -translate-x-1/2 font-bold text-xl flex flex-col items-center">
        <span>Total</span>
        <span className={balance > 0 ? "text-green-500" : "text-red-400"}>
          {balance} zł
        </span>
      </p>
      <div className="flex justify-end mb-5">
        <DialogAddPayment
          type={type}
          trigger={<Button className="mt-4">Add {type}</Button>}
        />
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
              <DashboardDetails type="expense" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income">
          <Card>
            <CardHeader></CardHeader>
            <CardContent className="space-y-2">
              <DashboardDetails type="income" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default DashboardTabs;
