import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import EmptyBudget from "@/components/Dashboard/EmptyBudget";
import { DialogAddPayment } from "@/components/Dialogs/DialogAddPayment";
import { Button } from "@/components/ui/button";
import DashboardDetails from "@/components/Dashboard/DashboardDetails";

const Dashboard = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex h-[calc(100%-60px)]">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <DialogAddPayment
            trigger={<Button className="mt-4">Add expense</Button>}
          />
        </div>
        <div className="flex flex-col flex-1 items-center rounded-lg border border-dashed shadow-sm p-10 pb-5 sm:p2">
          {transactions.length ? <DashboardDetails /> : <EmptyBudget />}
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
