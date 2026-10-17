import AppLayout from "./components/layout/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { ProductsPage } from "./pages/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
