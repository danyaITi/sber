import Privileges from "./pages/priveleges/priveleges";
import Rating from "./pages/rating/rating";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import Vector from "./assets/vector.svg?react";
import { ApiProvider, useApi } from "./context/apiContext";

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
  const { apiClient, token } = useApi();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient?.getUser(),
    enabled: !!token,
  });

  function handleClick() {
    const message = JSON.stringify({
      action: "route_back",
    });

    //@ts-ignore
    // Android native bridge
    window.AndroidBridge?.postMessage?.(message);

    //@ts-ignore
    // iOS native bridge
    window.webkit?.messageHandlers?.nativeHandler?.postMessage(message);
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

        <span className="username">{`${userQuery.data?.data.first_name} ${userQuery.data?.data.last_name}`}</span>
      </div>

      <div>{children}</div>
    </>
  );
};

const AppRoutes = () => {
  return (
    <ApiProvider>
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
    </ApiProvider>
  );
};

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
