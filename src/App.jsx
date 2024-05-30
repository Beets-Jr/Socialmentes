import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import { AppStorage } from "./Contexts/AppContext";
import RouteIsLogged from "./Components/Login/RouteIsLogged";
import ProtectedRoute from "./Components/Login/ProtectedRoute";
import PainelAdm from "./Components/PainelAdm/PainelAdm"
import { AuthProvider } from "./Components/Login/AuthContext";

function App() {
  return (
    <Router>
      <AppStorage>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login/*" element={<RouteIsLogged><Login /></RouteIsLogged>} />
            <Route path="painel-adm/*" element={<ProtectedRoute><PainelAdm /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </AppStorage>
    </Router>
  );
}

export default App;
