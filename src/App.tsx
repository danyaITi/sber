import Privileges from "./pages/priveleges/priveleges";
import Rating from "./pages/rating/rating";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import Vector from "./assets/vector.svg?react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const Layout = ({ children }: PropsWithChildren) => {
  function handleClick() {
    const message = JSON.stringify({
      action: "route_to_calculator",
    });

    //@ts-ignore
    // Android native bridge
    window.AndroidBridge?.postMessage?.(message);

    //@ts-ignore
    // iOS native bridge
    window.webkit?.messageHandlers?.nativeHandler?.postMessage({
      action: "route_back",
    });
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <button onClick={handleClick} className="backButton">
          <Vector width={7} height={13} />
        </button>

        <span className="username">Иван Иванович</span>
      </div>

      <div>{children}</div>
    </>
  );
};

const AppRoutes = () => (
  <Routes>
    <Route
      path="/priveleges"
      element={
        <Layout>
          <Privileges />
        </Layout>
      }
    />
    <Route
      path="/rating"
      element={
        <Layout>
          <Rating />
        </Layout>
      }
    />
  </Routes>
);

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
