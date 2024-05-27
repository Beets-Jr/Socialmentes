import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login/Login";

import PasswordResetPainel from "../Components/Login/Reset Password/PasswordResetPainel";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="login/reset-password" element={<PasswordResetPainel />} />
    </Routes>
  );
}

export default AppRoutes;
