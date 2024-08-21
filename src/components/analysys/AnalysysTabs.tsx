import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

const AnalysysTabs = () => {
  const [type, setType] = useState("general");

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
      <TabsContent value="general">
        <Card>
          <CardContent className="space-y-2">General</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="income">
        <Card>
          <CardContent className="space-y-2">Incomes</CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="expense">
        <Card>
          <CardContent className="space-y-2">Expenses</CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
export default AnalysysTabs;
