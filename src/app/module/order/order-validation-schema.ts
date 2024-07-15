import { z } from "zod";

// Define the Zod schema
export const orderValidationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  cart: z.array(
    z.object({
      _id: z.string().min(1),
      quantity: z.number(),
    }),
  ),
  totalPrice: z.number()
});
