import { Button } from "@/components/ui/button";
import { DialogAddPayment } from "@/components/Dialogs/DialogAddPayment";
import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";

export function Dashboard() {
  const transactions = useSelector(selectTransactions);

  console.log(transactions);

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm "
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Your budget is still empty.
            </h3>
            <p className="text-sm text-muted-foreground">
              Start adding expenses and income to take control of your finances!
            </p>
            <DialogAddPayment
              trigger={<Button className="mt-4">Add the first expense</Button>}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
