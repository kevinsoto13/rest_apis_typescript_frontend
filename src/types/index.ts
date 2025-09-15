import { object, string, number, boolean, array } from 'valibot';
import type { InferOutput, InferInput } from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object ({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)

// Tipos inferidos
export type Product = InferOutput<typeof ProductSchema>;
export type DraftProduct = InferInput<typeof DraftProductSchema>;