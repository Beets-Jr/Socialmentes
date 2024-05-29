import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Registrations from "./Components/Registrations/Registrations";
import Positions from "./Components/Positions/Positions";
import Login from "./Components/Login/Login";
import PasswordResetPainel from "./Components/Login/Reset Password/PasswordResetPainel";
import DialogConfirmation from "./Components/ElementsInterface/DialogConfirmation";
import { AppStorage } from "./Contexts/AppContext";
import ProtectedRoute from "./Components/Login/ProtectedRoute";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";

function AppContent() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/reset-password";

  return (
    <AppStorage>
      <div style={{ display: "flex" }}>
        {!isAuthPage && <Sidebar />}
        <div style={{ display: "block" }}>
          {!isAuthPage && <Header />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<PasswordResetPainel />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DialogConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pacientes"
              element={
                <ProtectedRoute>
                  <DialogConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cargos"
              element={
                <ProtectedRoute>
                  <Positions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastros"
              element={
                <ProtectedRoute>
                  <Registrations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/opcoes"
              element={
                <ProtectedRoute>
                  <DialogConfirmation />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AppStorage>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
