import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DatePicker } from "../ui/DatePicker";
import {
  addTransaction,
  editTransaction,
  Transaction,
} from "@/store/transactionsSlice";
import { useDispatch } from "react-redux";
import { formSchema } from "@/validation/transactionFormSchema";
import {
  expensesCategoryList,
  incomeCategoryList,
} from "@/constants/categories";

interface TransactionFormProps {
  type: "expenses" | "income";
  transaction?: Transaction;
  onSave: () => void;
}

const TransactionForm = ({
  type,
  transaction,
  onSave,
}: TransactionFormProps) => {
  const dispatch = useDispatch();

  const categoryList =
    type === "expenses" ? expensesCategoryList : incomeCategoryList;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: transaction ? new Date(transaction.date) : new Date(),
      amount: transaction?.amount,
      category: transaction?.category,
      comment: transaction?.comment,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTransaction = {
      ...values,
      id: transaction ? transaction.id : Date.now(),
      date: values.date.toISOString(),
    };
    if (transaction) {
      dispatch(editTransaction(newTransaction));
    } else {
      dispatch(addTransaction(newTransaction));
    }
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="0"
                    step="0.01"
                    type="number"
                    min="0"
                    {...field}
                    value={field.value ?? ""}
                  />
                  <span className="absolute right-10 top-1/2 -translate-y-1/2">
                    PLN
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryList.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <DatePicker field={field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input
                  placeholder="Comment"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default TransactionForm;
