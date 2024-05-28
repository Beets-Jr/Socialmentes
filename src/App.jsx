import Registrations from "./Components/Registrations/Registrations"
import Positions from "./Components/Positions/Positions"
import Login from "./Components/Login/Login"
import DialogConfirmation from "./Components/ElementsInterface/DialogConfirmation"
import Sidebar from "./Components/Sidebar/Sidebar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import Header from "./Components/Header/Header"
import { UserStorage } from "./UserContext"

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/pagina-login" element={<Login/>}/>
      </Routes>
      <UserStorage>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ display: 'block' }}>
            <Header/>
            <Routes>
              <Route path="/" element={<DialogConfirmation />} />
              <Route path="/pacientes" element={<DialogConfirmation />} />
              <Route path="/cargos" element={<Positions />} />
              <Route path="/cadastros" element={<Registrations />} />
              <Route path="/opcoes" element={<DialogConfirmation />} />
            </Routes>
          </div>
        </div>
      </UserStorage>
    </Router>
  )
}

export default App