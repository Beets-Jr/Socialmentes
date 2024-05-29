import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  } else if ( isAuthenticated === true) {
    return children;
  } else {
    return <></>
  }
};

export default ProtectedRoute;
