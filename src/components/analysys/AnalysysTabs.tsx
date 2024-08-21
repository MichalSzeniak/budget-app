import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import IncomeExpenseBarChart from "./IncomeExpenseBarChart ";

const AnalysysTabs = () => {
  const [type, setType] = useState("general");

  const data: Array<"income" | "expense" | "general"> = [
    "general",
    "income",
    "expense",
  ];

  return (
    <Tabs
      value={type}
      onValueChange={setType}
      defaultValue="expense"
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="income">Incomes</TabsTrigger>
        <TabsTrigger value="expense">Expenses</TabsTrigger>
      </TabsList>
      {data.map((type) => (
        <TabsContent value={type} key={type}>
          <Card>
            <CardContent className="space-y-2">
              <IncomeExpenseBarChart type={type} />
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
export default AnalysysTabs;
