import { useState } from "react";
import type { Product } from "../types";

type ProductFormProps = {
  product?: Product;
  showAvailability?: boolean;
};

export default function ProductForm({
  product,
  showAvailability = false,
}: ProductFormProps) {

  const [isAvailable, setIsAvailable] = useState<boolean>(
    product?.availability ?? false
  );
  return (
    <>
      {/* Product Name Field */}
      <div className="space-y-3">
        <label
          className="flex items-center space-x-2 text-slate-700 font-semibold text-lg"
          htmlFor="name"
        >
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>Product Name</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <input
            id="name"
            type="text"
            className="relative w-full p-4 bg-slate-50/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-300 text-lg placeholder-slate-400 shadow-md"
            placeholder="Enter your amazing product name..."
            name="name"
            defaultValue={product?.name}
          />
        </div>
      </div>

      {/* Price Field */}
      <div className="space-y-3">
        <label
          className="flex items-center space-x-2 text-slate-700 font-semibold text-lg"
          htmlFor="price"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span>Price</span>
        </label>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
          <div className="relative flex items-center">
            <div className="absolute left-4 text-slate-500 text-lg font-semibold z-10">
              $
            </div>
            <input
              id="price"
              type="number"
              className="relative w-full pl-10 pr-4 py-4 bg-slate-50/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all duration-300 text-lg placeholder-slate-400 shadow-md"
              placeholder="0.00"
              name="price"
              min="0"
              step="0.01"
              defaultValue={product?.price}
            />
          </div>
        </div>
      </div>

      {/* 👇 Solo mostrar si es edición */}
      {/* Availability Toggle */}
      {showAvailability && (
        <div className="space-y-3">
          <label
            className="flex items-center space-x-2 text-slate-700 font-semibold text-lg"
            htmlFor="availability"
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Availability</span>
          </label>
          <div className="flex items-center space-x-4">
            {/* Campo oculto para enviar al backend el valor actual */}
            <input type="hidden" name="availability" value={isAvailable.toString()} />

            <button
              type="button"
              onClick={() => setIsAvailable((prev) => !prev)}
              className={`relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full transition ${
                isAvailable ? "bg-purple-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute left-1 h-6 w-6 rounded-full bg-white shadow-md transition ${
                  isAvailable ? "translate-x-8" : ""
                }`}
              ></span>
            </button>

            <span className="text-slate-600 text-sm font-medium">
              {isAvailable ? "Disponible ✅" : "No Disponible ❌"}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
