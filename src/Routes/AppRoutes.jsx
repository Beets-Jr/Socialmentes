import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login'
import PasswordReset from '../Components/Login/PasswordReset'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/pagina-login" element={<Login />} />
            <Route path="/recuperar-senha" element={<PasswordReset />} />
        </Routes>
    )
}

export default AppRoutes