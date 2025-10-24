import { createBrowserRouter } from "react-router-dom";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { lazy, Suspense } from "react";


const Layout = lazy(() => import("./layouts/Layout"));
const Products = lazy(() => import("./views/Products"));
const NewProduct = lazy(() => import("./views/NewProduct"));
const EditProduct = lazy(() => import("./views/EditProduct"));

// Actions / loaders
import { action as deleteProductAction } from "./components/ProductDetail";
import { fetchProducts } from "./views/products/loader";
import { updateAvailability } from "./views/products/actions";

// NOTE: NewProduct and EditProduct expose loader/action functions which
// used to be imported statically. That prevented code-splitting when the
// components were lazy-loaded. Below we use dynamic import() inside
// wrapper functions so the module is only loaded when the route runs.
const newProductAction = async (args: ActionFunctionArgs) => {
  const mod = await import("./views/NewProduct");
  // forward whatever args react-router passes (request, params, etc.)
  return mod.action ? mod.action(args) : null;
};

const editProductLoader = async (args: LoaderFunctionArgs) => {
  const mod = await import("./views/EditProduct");
  return mod.loader ? mod.loader(args) : null;
};

const editProductAction = async (args: ActionFunctionArgs) => {
  const mod = await import("./views/EditProduct");
  return mod.action ? mod.action(args) : null;
};

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
