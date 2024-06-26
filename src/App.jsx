import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Screens/Login/Login";
import { AppStorage } from "./Contexts/AppContext";
import RouteIsLogged from "./Routes/Utils/RouteIsLogged";
import ProtectedRoute from "./Routes/Utils/ProtectedRoute";
import PainelAdm from "./Routes/PainelAdmRoute"
import { AuthProvider } from "./Contexts/AuthContext";

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
