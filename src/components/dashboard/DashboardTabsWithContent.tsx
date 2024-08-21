import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";
import DashboardDetails from "./DashboardDetails";
import { DateRange } from "react-day-picker";

interface DashboardTabsWithContentProps {
  type: string;
  setType: (type: string) => void;
  date: DateRange | undefined;
}

const DashboardTabsWithContent = ({
  type,
  setType,
  date,
}: DashboardTabsWithContentProps) => {
  return (
    <Tabs value={type} onValueChange={setType} defaultValue="expense">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="expense">Expenses</TabsTrigger>
        <TabsTrigger value="income">Incomes</TabsTrigger>
      </TabsList>
      <TabsContent value="expense">
        <Card>
          <CardContent className="space-y-2">
            <DashboardDetails type="expense" date={date} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="income">
        <Card>
          <CardContent className="space-y-2">
            <DashboardDetails type="income" date={date} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabsWithContent;
