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
import { addTransaction } from "@/store/transactionsSlice";
import { useDispatch } from "react-redux";

interface TransactionFormProps {
  type: "expenses" | "income";
  transaction?: {
    id: number;
    description: string;
    amount: number;
    date: string;
    comment?: string | undefined;
  };
  onSave: () => void;
}

const expansesCategoryList = [
  "Health",
  "Home",
  "Leisure",
  "Education",
  "Gifts",
  "Groceries",
  "Family",
  "Workout",
  "Transportation",
  "Other",
];

const incomeCategoryList = ["Paycheck", "Gift", "Interest", "Other"];

const formSchema = z.object({
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Enter the value.").positive()
  ),
  category: z.string({
    required_error: "Select a category.",
  }),
  comment: z
    .string()
    .max(200, {
      message: "Comment too long.",
    })
    .optional(),
  date: z.date({
    required_error: "A date is required.",
  }),
});

export function TransactionForm({
  type,
  transaction,
  onSave,
}: TransactionFormProps) {
  const dispatch = useDispatch();

  const categoryList =
    type === "expenses" ? expansesCategoryList : incomeCategoryList;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const newTransaction = {
      ...values,
      id: transaction ? transaction.id : Date.now(),
      date: values.date.toISOString(),
    };

    dispatch(addTransaction(newTransaction));

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
              <Select onValueChange={field.onChange}>
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
}
