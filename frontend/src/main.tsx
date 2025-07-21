import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider, createToaster } from "@chakra-ui/react";
import { system } from "./components/ui/theme.tsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import PromptPage from "./PromptPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddPrompt from "./AddPrompt.tsx";
import { Toaster } from "@/components/ui/toaster";
import Profile from "./Profile.tsx";
import { useApiClient } from "./api/hooks/useApiClient.tsx";
import { AuthSync } from "./api/AuthSync.tsx";

const queryClient = new QueryClient();

const onRedirectCallback = async (appState) => {
  try {
    const apiClient = useApiClient(); // your API client creation function
    await apiClient.get("/auth/me");
    console.log("User synced with backend after login");
  } catch (error) {
    console.log("Backend sync failed:", error);
  }
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ChakraProvider value={system}>
        <Auth0Provider
          domain="dev-grnq2iwxpxi2aien.us.auth0.com"
          clientId="Sis4zMx5Xhbg14USMQ4sGtlOJYSCFjzV"
          authorizationParams={{
            redirect_uri: window.location.origin + "/home",
            audience: "https://test-api",
          }}
          // onRedirectCallback={onRedirectCallback}
        >
          <QueryClientProvider client={queryClient}>
            <AuthSync />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/home" element={<Home />} />
              <Route path="/prompt" element={<PromptPage />} />
              <Route path="/prompt/add" element={<AddPrompt />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Toaster />
          </QueryClientProvider>
        </Auth0Provider>
      </ChakraProvider>
    </Router>
  </StrictMode>
);
