import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, uiPreference } = useAuthStore();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={uiPreference === "old" ? "/login" : "/signin"} replace />
  );
};

export default PrivateRoute;
