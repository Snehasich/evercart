// here it is used to protect the any route when user is not logged in
import { Navigate } from "react-router-dom";
import { useRef } from "react";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const alertedRef = useRef(false); // prevent double alert

  if (!isLoggedIn) {
    if (!alertedRef.current) {
      alertedRef.current = true;
      alert("Please log in to access this page.");
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
