import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./UI/Home";
import Error from "./UI/Error";
import Menu from "./Features/menu/Menu";
import Cart from "./Features/cart/Cart";
import CreateOrder from "./Features/order/CreateOrder";
import Order from "./Features/order/Order";
import AppLayout from "./UI/AppLayout";
import { loader as menuLoader } from "./Features/menu/Loader";
import { loader as orderLoader } from "./Features/order/Loader";
import { action as createOrderAction } from "./Features/order/Action";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        loader: orderLoader,
        element: <Order />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
