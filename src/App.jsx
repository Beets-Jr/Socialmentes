import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import { AppStorage } from "./Contexts/AppContext";
import RouteIsLogged from "./Components/Login/RouteIsLogged";
import ProtectedRoute from "./Components/Login/ProtectedRoute";
import PainelAdm from "./Components/PainelAdm/PainelAdm"

function App() {
  return (
    <Router>
      <AppStorage>
        <Routes>
          <Route path="login/*" element={<RouteIsLogged><Login /></RouteIsLogged>} />
          <Route path="painel-adm/*" element={<ProtectedRoute><PainelAdm /></ProtectedRoute>} />
        </Routes>
      </AppStorage>
    </Router>
  );
}

export default App;
