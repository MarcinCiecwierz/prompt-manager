import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom"; // or your routing library

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
