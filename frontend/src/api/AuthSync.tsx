import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const AuthSync = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const hasSynced = useRef(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const syncUser = async () => {
      if (isAuthenticated && !hasSynced.current) {
        hasSynced.current = true;
        try {
          const token = await getAccessTokenSilently();
          await axios.get(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error("❌ Błąd synchronizacji z backendem:", err);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};
