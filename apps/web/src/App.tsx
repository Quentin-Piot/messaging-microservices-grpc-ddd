import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StatusPage from "@/pages/status.page";
import { Provider } from "@/components/ui/provider"
function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: StatusPage(),
    },
  ]);


  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
