import { Link, useLoaderData, useNavigation, type ActionFunctionArgs } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import ProductDetail from "../components/ProductDetail";
import type { Product } from "../types";
import Spinner from "../components/Spinner";
import { useState } from "react";

export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateProductAvailability(+data.id);
  return {};
}

export default function Products() {
  const products = useLoaderData() as Product[];

  const navigation = useNavigation();
  const [isUpdating, setIsUpdating] = useState(false);
  // Mostrar spinner durante la carga inicial o recarga
  const isLoading = navigation.state === "loading";

  // Función para exponer el estado de actualización a los componentes hijos
  const setGlobalUpdating = (updating: boolean) => {
    setIsUpdating(updating);
  };


  return (
    <div className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Contenedor principal unificado - MISMO DISEÑO QUE NEWPRODUCTS */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header unificado - MISMO DISEÑO QUE NEWPRODUCTS */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 p-6 border-b border-slate-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left - Title */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        Products
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <p className="text-slate-300 text-sm sm:text-base">
                          Manage your inventory and view all products
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Button */}
                <div className="flex flex-col items-end">
                  <Link to="productos/nuevo" className="btn-primary">
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 transform group-hover:rotate-90 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Add New Product</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contenido de productos - Aquí irá tu lista de productos */}
            {/* Contenido de productos */}
            <div className="p-6 relative">
              {/* Overlay de carga inicial */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                  <Spinner />
                </div>
              )}
              
              {/* Overlay de actualización de producto */}
              {isUpdating && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                  <Spinner />
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="p-4 text-center">Name</th>
                      <th className="p-4 text-center">Price</th>
                      <th className="p-4 text-center">Availability</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!products || products.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center">
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <p className="text-gray-500">No products found</p>
                          )}
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <ProductDetail 
                          key={product.id} 
                          product={product} 
                          setGlobalUpdating={setGlobalUpdating}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bottom decoration - MISMO DISEÑO QUE NEWPRODUCTS */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-sm px-5 py-2 rounded-full border border-slate-200/50">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-600 text-sm font-medium">
                Secure & Fast Processing
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
