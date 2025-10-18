import { updateProductAvailability } from "../../services/ProductService";
import type { ActionFunctionArgs } from "react-router-dom";

export async function updateAvailability({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return {};
}
