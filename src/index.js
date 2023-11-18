import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./plugin/i18n";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";

// store
import { Provider } from "react-redux";
import { store } from "./store";
import { PriceContextProvider } from "./context/PriceContext";

//layout
const Admin = React.lazy(() => import("./layouts/admin"));
const Viewer = React.lazy(() => import("./layouts/viewer"));
const NotFound = React.lazy(() => import("./scenes/NotFound"));

// component
const Cart = React.lazy(() => import("./scenes/View/Cart"));
const Home = React.lazy(() => import("./scenes/View/Home"));
const Confirmation = React.lazy(() => import("./scenes/View/Confirmation"));
const Checkout = React.lazy(() => import("./scenes/View/Checkout"));
const ProductList = React.lazy(() => import("./scenes/View/ProductList"));
const ProductDetail = React.lazy(() => import("./scenes/View/ProductDetail"));
// page Admin

const AdminProductBox = React.lazy(() =>
  import("./scenes/Admin/Product/Component/AdminProductBox")
);
const AdminProduct = React.lazy(() => import("./scenes/Admin/Product"));
const AdminProductEdit = React.lazy(() =>
  import("./scenes/Admin/Product/Component/AdminProductEdit")
);
const AdminProductAdd = React.lazy(() =>
  import("./scenes/Admin/Product/Component/AdminProductAdd")
);
const AdminProductDetail = React.lazy(() =>
  import("./scenes/Admin/Product/Component/AdminProductDetail")
);
const Dashboard = React.lazy(() => import("./scenes/Admin/Dashboard"));

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Viewer />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "products/page/:pageNum",
        element: <ProductList />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout/success",
        element: <Confirmation />,
      },

      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      {
        path: "/admin/product",
        element: <AdminProduct />,
        children: [
          {
            index: true,
            element: <AdminProductBox />,
          },
          {
            path: "/admin/product/page/:pageNum",
            element: <AdminProductBox />,
          },
          {
            path: "/admin/product/:id",
            element: <AdminProductDetail />,
          },
          {
            path: "/admin/product/add",
            element: <AdminProductAdd />,
          },
          {
            path: "/admin/product/edit/:id",
            element: <AdminProductEdit />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <PriceContextProvider>
          <RouterProvider router={router} />
        </PriceContextProvider>
        <ToastContainer />
      </Provider>
    </Suspense>
  </React.StrictMode>
);
