import {
  Link,
  Form,
  useActionData,
  redirect,
  type ActionFunctionArgs,
  useNavigation,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";
import Spinner from "../components/Spinner";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  await addProduct(data)

  return redirect('/')
}

export default function NewProduct() {
  const error = useActionData() as string;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Contenedor principal unificado */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Header unificado */}
            <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 p-6 border-b border-slate-700">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                {/* Left - Title */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 ">
                    <div className="">
                      <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        New Product
                      </h1>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <p className="text-slate-300 text-sm sm:text-base">
                          Fill in the details to create your product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right - Button */}
                <div className="flex flex-col items-end">
                  <Link
                    to="/"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                  >
                    <div className="flex items-center space-x-2">
                      <svg
                        className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      <span>Back to Products</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Overlay de carga durante el envío */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
                <Spinner />
              </div>
            )}

            {/* Error Message - integrado en la misma tarjeta */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border-b border-red-200/50 px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-2.5 rounded-full shadow-md">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <ErrorMessage>{error}</ErrorMessage>
                </div>
              </div>
            )}

            {/* Form Body - integrado en la misma tarjeta */}
            <Form className="p-6 space-y-6" method="POST">
              {/* Product Name Field */}
              <ProductForm />

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting} // Deshabilitar botón durante envío
                >
                  <div className="flex items-center justify-center space-x-3">
                    {isSubmitting ? (
                      <>
                        <Spinner /> {/* Spinner en el botón también */}
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5 transform group-hover:rotate-12 transition-transform"
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
                        <span>Create Product</span>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-2 text-center">
                <p className="text-slate-500 text-sm">
                  🚀 Your product will be available immediately after creation
                </p>
              </div>
            </Form>
          </div>

          {/* Bottom decoration */}
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
