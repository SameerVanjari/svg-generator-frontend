import React from "react";
import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
import { useAuth } from "../contexts/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // const token = Cookies.get("authToken"); // Replace 'authToken' with your cookie name

  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // return <>{children}</>;

  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/auth/login" />;

  return children;
};

export default ProtectedRoute;
