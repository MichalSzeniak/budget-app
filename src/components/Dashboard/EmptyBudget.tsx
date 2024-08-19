import DialogAddPayment from "../Dialogs/DialogAddPayment";
import { Button } from "../ui/button";

const EmptyBudget = () => {
  return (
    <div className="flex justify-center h-full flex-col items-center gap-1 text-center">
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
  );
};
export default EmptyBudget;
