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
import TransactionForm from "../transactionForm/TransactionForm";

interface DialogProps {
  trigger: React.ReactNode;
  transaction?: Transaction;
  type?: string;
}

const DialogAddPayment = ({
  trigger,
  transaction,
  type = "expense",
}: DialogProps) => {
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
        <Tabs defaultValue={type} className="sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger disabled={!!transaction} value="expense">
              Expense
            </TabsTrigger>
            <TabsTrigger disabled={!!transaction} value="income">
              Income
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expense">
            <Card>
              <CardHeader>
                <CardTitle>Expense</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <TransactionForm
                  transaction={transaction}
                  type="expense"
                  onSave={() => onSave()}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <Card>
              <CardHeader>
                <CardTitle>Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <TransactionForm
                  transaction={transaction}
                  type="income"
                  onSave={() => onSave()}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
export default DialogAddPayment;
