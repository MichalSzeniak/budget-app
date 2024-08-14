import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Transaction } from "@/store/transactionsSlice";
import TransactionForm from "../Forms/TransactionForm";

interface DialogProps {
  trigger: React.ReactNode;
  transaction?: Transaction;
}

export function DialogAddPayment({ trigger, transaction }: DialogProps) {
  const [open, setOpen] = useState(false);

  const onSave = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add transactions</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="Expenses" className="sm:w-[400px]">
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
                <TransactionForm
                  transaction={transaction}
                  type="expenses"
                  onSave={() => onSave()}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Income">
            <Card>
              <CardHeader>
                <CardTitle>Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <TransactionForm type="income" onSave={() => onSave()} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
