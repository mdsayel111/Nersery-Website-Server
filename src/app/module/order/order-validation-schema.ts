import { z } from 'zod';

// Define the Zod schema
export const orderValidationSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    adress: z.string(),
    cart: z.array(
        z.object({
            id: z.string(),
            quantity: z.number()
        })
    )
});
