import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";

// Lazy imports
const Products = lazy(() => import("./views/Products"));
const NewProduct = lazy(() => import("./views/NewProduct"));
const EditProduct = lazy(() => import("./views/EditProduct"));

// Actions / loaders
import { action as newProductAction } from "./views/NewProduct";
import { loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";
import { fetchProducts } from "./views/products/loader";
import { updateAvailability } from "./views/products/actions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Cargando...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Cargando productos...</div>}>
            <Products />
          </Suspense>
        ),
        loader: fetchProducts,
        action: updateAvailability,
      },
      {
        path: "/productos/nuevo",
        element: (
          <Suspense fallback={<div>Cargando formulario...</div>}>
            <NewProduct />
          </Suspense>
        ),
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: (
          <Suspense fallback={<div>Cargando producto...</div>}>
            <EditProduct />
          </Suspense>
        ),
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction,
      },
    ],
  },
]);
