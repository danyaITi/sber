import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { ApiClient } from "../api/api";
import { useTokenFromUrl } from "../utils/token";

interface ApiContextValue {
  apiClient: ApiClient | null;
  token: string | null;
}

const ApiContext = createContext<ApiContextValue>({
  apiClient: null,
  token: null,
});

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const token = useTokenFromUrl();

  const apiClient = useMemo(
    () => (token ? new ApiClient(token) : null),
    [token],
  );

  return (
    <ApiContext.Provider value={{ apiClient, token }}>
      {children}
    </ApiContext.Provider>
  );
};

// Хук для доступа к API-клиенту и токену
export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within ApiProvider");
  }
  return context;
};
