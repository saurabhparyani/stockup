import z from "zod";

export const productSchema = z.object({
    productId: z.string().optional(),
    name: z.string().min(3, {message: "Name has to be a minimum of 3 characters"}),
    price: z.number().min(1, {message: "Insufficient Price"}),
    stockQuantity: z.number().min(1, {message: "Minimum quantity required: 1"}),
    rating: z.number().min(1, {message: "Rating has to be a minimum of 1"}).max(5, {message: "Rating has to be a maximum of 5"}).optional()
})