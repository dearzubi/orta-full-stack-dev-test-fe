import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router.jsx";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/query-client.js";
function RouterProviderComponent() {
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <HeroUIProvider>
        <RouterProviderComponent />
      </HeroUIProvider>
    </QueryClientProvider>
  );
}

export default App;
