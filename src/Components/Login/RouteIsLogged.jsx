import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RouteIsLogged = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === true) {
    return <Navigate to="/painel-adm" />;
  } else if ( isAuthenticated === false) {
    return children;
  } else {
    return <></>
  }
};

export default RouteIsLogged;
