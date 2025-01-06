import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const isTokenExpired = tokenExpiration && new Date(tokenExpiration) < new Date();

  if (isTokenExpired) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiration");
    return <Navigate to="/login" />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
