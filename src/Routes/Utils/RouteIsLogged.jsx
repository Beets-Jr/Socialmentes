import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

const RouteIsLogged = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === true) {
    if (user.position === "Administrador")
      return <Navigate to="/painel-adm/pacientes" />;
    else if (user.position === "Psicólogo")
      return <Navigate to="/painel-psi/home" />;
  } else if ( isAuthenticated === false) {
    return children;
  } else {
    return <></>
  }
};

export default RouteIsLogged;
