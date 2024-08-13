import { selectTransactions } from "@/store/transactionsSlice";
import { useSelector } from "react-redux";
import EmptyBudget from "@/components/Dashboard/EmptyBudget";
import DashboardTable from "@/components/Dashboard/DashboardTable";
import Chart from "@/components/Dashboard/Chart";

export function Dashboard() {
  const transactions = useSelector(selectTransactions);

  return (
    <div className="flex h-[calc(100%-60px)]">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-10 sm:p2">
          {transactions.length ? (
            <>
              <Chart transactions={transactions} />
              <DashboardTable transactions={transactions} />
            </>
          ) : (
            <EmptyBudget />
          )}
        </div>
      </main>
    </div>
  );
}
