import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PrivateRoute({ children }) {
  const { admin, loadingAuth } = useAuth();

  if (loadingAuth) return <p>Loading...</p>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
}
