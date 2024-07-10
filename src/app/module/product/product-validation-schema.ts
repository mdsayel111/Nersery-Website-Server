import { z } from "zod";

// Define the Zod schema for the product
const productValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  imgUrl: z.string().url(), // Assuming imgUrl is a URL
  imgList: z.array(z.string().url()), // Assuming each item in imgList is a URL
  price: z.number().int().nonnegative(),
  quantity: z.number().int().nonnegative(), // Assuming quantity is a non-negative integer
  category: z.string(),
  rating: z.number().min(0).max(5), // Assuming rating is between 0 and 5
});

const productUodateValidationSchema = productValidationSchema.partial();


export { productValidationSchema, productUodateValidationSchema };
