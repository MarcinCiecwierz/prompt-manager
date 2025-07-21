import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export const AuthSync = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const hasSynced = useRef(false); // <- żeby wywołać tylko raz

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && !hasSynced.current) {
        hasSynced.current = true; // zapobiega wielokrotnemu wywołaniu
        try {
          const token = await getAccessTokenSilently();
          await axios.get("http://localhost:8080/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("✅ Użytkownik zsynchronizowany z backendem");
        } catch (err) {
          console.error("❌ Błąd synchronizacji z backendem:", err);
        }
      }
    };

    syncUser();
  }, [isAuthenticated, getAccessTokenSilently]);

  return null;
};
