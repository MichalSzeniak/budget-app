import { z } from "zod";

export const formSchema = z.object({
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().gte(1, "Enter the value.").positive()
  ),
  category: z.string({ required_error: "Select a category." }),
  comment: z.string().max(200, { message: "Comment too long." }).optional(),
  date: z.date({ required_error: "A date is required." }),
});
