import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("adminToken");

  return token ? element : <Navigate to="/AdminLogin" replace />;
};

export default ProtectedRoute;
