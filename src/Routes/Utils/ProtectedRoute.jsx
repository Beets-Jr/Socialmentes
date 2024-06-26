import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

// eslint-disable-next-line react/prop-types
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
