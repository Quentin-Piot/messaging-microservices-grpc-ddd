import { Provider } from "@/components/ui/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "@/components/router.tsx";


const queryClient = new QueryClient();


function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router />
      </Provider>
    </QueryClientProvider>

  );
}

export default App;
