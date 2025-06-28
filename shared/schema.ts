import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  category: z.enum(["women", "men", "unisex"]),
  scentType: z.enum(["oriental", "fresh", "floral", "woody", "citrus", "spicy", "clean", "artistic", "soft"]),
  description: z.string(),
  notes: z.object({
    top: z.array(z.string()),
    middle: z.array(z.string()),
    base: z.array(z.string()),
  }),
  image: z.string(),
  images: z.array(z.string()),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  sizes: z.array(z.object({
    size: z.string(),
    price: z.number(),
  })),
  featured: z.boolean().default(false),
});

export const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
  selectedSize: z.string(),
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;

export interface CartItemWithProduct extends CartItem {
  product: Product;
}
