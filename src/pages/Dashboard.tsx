import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import EmptyBudget from "@/components/dashboard/EmptyBudget";
import DashboardTabs from "@/components/dashboard/DashboardTabs";

const Dashboard = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex h-[calc(100%-60px)]">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-col flex-1 items-center rounded-lg border border-dashed shadow-sm p-2 sm:p-5">
          {transactions.length ? <DashboardTabs /> : <EmptyBudget />}
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
