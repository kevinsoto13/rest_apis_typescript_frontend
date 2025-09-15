import {
  Form,
  redirect,
  useFetcher,
  useNavigate,
  useNavigation,
  type ActionFunctionArgs,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";
import { useEffect, useState } from "react";


type ProductDetailsProps = {
  product: Product;
  setGlobalUpdating: (updating: boolean) => void;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

export default function ProductDetail({ product, setGlobalUpdating }: ProductDetailsProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const isAvailable = product.availability;

  // Efecto para mostrar el spinner mientras se actualiza la disponibilidad
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setIsUpdating(true);
      setGlobalUpdating(true);
    } else if (fetcher.state === "idle") {
      const timer = setTimeout(() => {
        setIsUpdating(false);
        setGlobalUpdating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, setGlobalUpdating]);

  // Efecto para detectar cuando se está eliminando el producto
  useEffect(() => {
    // Verificar si la navegación actual es para eliminar este producto específico
    if (navigation.state === "submitting" && 
        navigation.formData && 
        navigation.formData.get("id") === product.id.toString()) {
      setIsDeleting(true);
      setGlobalUpdating(true);
    } else if (navigation.state === "idle") {
      const timer = setTimeout(() => {
        setIsDeleting(false);
        setGlobalUpdating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [navigation.state, navigation.formData, product.id, setGlobalUpdating]);

  return (
    <tr className="border-b hover:bg-slate-50 transition">
      <td className="p-4 text-gray-900 text-left">{product.name}</td>
      <td className="p-4 text-gray-900 text-right">
        {formatCurrency(product.price)}
      </td>
      <td className="p-4 text-center">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            disabled={isUpdating || isDeleting}
            className={`relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full transition ${
              isAvailable ? "bg-purple-500" : "bg-slate-300"
            } ${isUpdating || isDeleting ? "opacity-70" : ""}`}
          >
            <span
              className={`absolute left-1 h-6 w-6 rounded-full bg-white shadow-md transition ${
                isAvailable ? "translate-x-8" : ""
              }`}
            ></span>
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-900 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/productos/${product.id}/editar`)}
            className="btn-primary"
            disabled={isUpdating || isDeleting}
          >
            Edit
          </button>
          <Form
            className="w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("Are you sure you want to delete this product?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value={isDeleting ? "Deleting..." : "Delete"}
              className="btn-secondary"
              disabled={isUpdating || isDeleting}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}