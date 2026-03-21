import { useLayoutEffect, useState } from "react";

export function useTokenFromUrl() {
  const [token, setToken] = useState<string | null>(null);

  useLayoutEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  return token;
}
