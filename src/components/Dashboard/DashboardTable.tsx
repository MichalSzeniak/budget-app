import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { TransactionsState } from "@/store/transactionsSlice";
import dayjs from "dayjs";
import DialogConfirm from "../Dialogs/DialogConfirm";

const DashboardTable = ({ transactions }: TransactionsState) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead className="hidden md:table-cell">Comment</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow>
            <TableCell className="font-medium">
              {transaction.amount} PLN
            </TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell className="hidden md:table-cell">
              {dayjs(transaction.date).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {transaction.comment}
            </TableCell>

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DialogConfirm
                    trigger={
                      <div className="cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent">
                        Edit
                      </div>
                    }
                  />
                  <DialogConfirm
                    trigger={
                      <div className="cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent">
                        Delete
                      </div>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default DashboardTable;
