import { createBrowserRouter, RouterProvider } from "react-router-dom";

import StatusPage from "@/pages/status.page";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: StatusPage(),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
