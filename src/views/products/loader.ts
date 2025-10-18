import { getProducts } from "../../services/ProductService";
import type { Product } from "../../types";


export async function fetchProducts(): Promise<Product[]> {
  try {
    const data = await getProducts();
    return data ?? [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
