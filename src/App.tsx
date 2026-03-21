import Privileges from "./pages/priveleges/priveleges";
import Rating from "./pages/rating/rating";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/priveleges" element={<Privileges />} />
          <Route path="/rating" element={<Rating />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
