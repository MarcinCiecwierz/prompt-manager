import { useAuth0 } from "@auth0/auth0-react";
import { createApiClient } from "../client";
import { useMemo } from "react";

export const useApiClient = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useMemo(() => {
    return createApiClient(getAccessTokenSilently);
  }, [getAccessTokenSilently]);
};
