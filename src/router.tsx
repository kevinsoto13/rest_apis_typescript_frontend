import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products from "./views/Products";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
import EdidtProduct, {loader as editProductLoader, action as editProductAction} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";
import { fetchProducts } from "./views/products/loader";
import { updateAvailability } from "./views/products/actions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: fetchProducts,
        action: updateAvailability
      },
      {
        path: "/productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'productos/:id/editar',
        element: <EdidtProduct/>,
        loader: editProductLoader,
        action: editProductAction
      },
      {
        path: 'productos/:id/eliminar',
        action: deleteProductAction
      }
    ],
  },
]);
