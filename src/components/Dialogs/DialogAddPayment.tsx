import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TransactionForm } from "../Forms/TransactionForm";

interface DialogProps {
  trigger: React.ReactNode;
}

export function DialogAddPayment({ trigger }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add transactions</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="Expenses" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Expenses">Expenses</TabsTrigger>
            <TabsTrigger value="Income">Income</TabsTrigger>
          </TabsList>
          <TabsContent value="Expenses">
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <TransactionForm type="expenses" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Income">
            <Card>
              <CardHeader>
                <CardTitle>Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <TransactionForm type="income" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
