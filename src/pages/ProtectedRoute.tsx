import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("userRole");

  if (!token || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
