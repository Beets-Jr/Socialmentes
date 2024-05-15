import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/pagina-login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes