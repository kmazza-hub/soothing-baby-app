import React from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = React.useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
