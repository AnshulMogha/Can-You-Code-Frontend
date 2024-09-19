import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "./AuthProvider";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import LoadingBlur from "../components/LoadingBlur/LoadingBlur";
const RouteProtector = function ({ children }) {
  const query = useAuthContext();
  const { isPaused, isError, isLoading, data } = query;

  const location = useLocation();
  const { pathname } = location;

  if (isPaused) {
    return <div>You do not have an active connection</div>;
  }

  if (isError) {
    console.error("Error in fetching auth status");
    return <div>Error fetching authentication status</div>;
  }

  if (isLoading) return <LoadingBlur />;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/login");

  // Ensure data is present before accessing nested properties
  const isAuthenticated = data?.data?.isAuthenticated || false;

  if (!isAuthenticated && isAdminRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isLoginRoute) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default RouteProtector;
